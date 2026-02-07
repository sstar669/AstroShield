"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Container, Stack, Typography, Alert, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Loading from '@/components/loading';
import NEOSearchForm from '@/components/NEOSearchForm';
import NEODisplay from '@/components/NEODisplay';
import { nasaClient, type NEODetails } from '@/lib/nasa-api';
import { addDays, format } from 'date-fns';
import CanvasBackground from '@/app/components/CanvasBackground';

export default function HomePage() {
  const [username, setUsername] = useState<string>("");
  const [authLoading, setAuthLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [neos, setNeos] = useState<Record<string, NEODetails[]>>({});
  const [currentEndDate, setCurrentEndDate] = useState<Date>(addDays(new Date(), 7));
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const checkAuth = useCallback(async () => {
    try {
      // Check if we have a valid session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        router.push("/login");
        return;
      }

      // Get user info from the session
      const user = session.user;
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email || "User";
      setUsername(name);

      // Store JWT in localStorage for future use
      localStorage.setItem("supabase_jwt", session.access_token);

      // Load initial NEO data
      try {
        setSearchLoading(true);
        const startDate = format(new Date(), 'yyyy-MM-dd');
        const endDate = format(currentEndDate, 'yyyy-MM-dd');

        const response = await nasaClient.searchNEOs({ start_date: startDate, end_date: endDate });
        setNeos(response.near_earth_objects);
      } catch (err) {
        console.error("Failed to load initial NEO data:", err);
        setError("Failed to load NEO data. Please try again.");
      } finally {
        setSearchLoading(false);
      }
    } catch (err) {
      console.error("Auth error:", err);
      router.push("/login");
    } finally {
      setAuthLoading(false);
    }
  }, [supabase.auth, router, currentEndDate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSearch = async (startDate: string, endDate: string) => {
    try {
      setSearchLoading(true);
      setError(null);

      const response = await nasaClient.searchNEOs({ start_date: startDate, end_date: endDate });
      setNeos(response.near_earth_objects);
      setCurrentEndDate(new Date(endDate));
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setSearchLoading(true);
      const newEndDate = addDays(currentEndDate, 7);
      const startDate = format(addDays(currentEndDate, 1), 'yyyy-MM-dd');
      const endDate = format(newEndDate, 'yyyy-MM-dd');

      const response = await nasaClient.searchNEOs({ start_date: startDate, end_date: endDate });

      // Merge new data with existing data
      setNeos(prevNeos => {
        const merged = { ...prevNeos };
        Object.entries(response.near_earth_objects).forEach(([date, neosForDate]) => {
          if (merged[date]) {
            merged[date] = [...merged[date], ...neosForDate];
          } else {
            merged[date] = neosForDate;
          }
        });
        return merged;
      });

      setCurrentEndDate(newEndDate);
    } catch (err) {
      console.error("Load more failed:", err);
      setError("Failed to load more data. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // Remove JWT from localStorage
      localStorage.removeItem("supabase_jwt");
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (authLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Loading />
      </Container>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white">
      {/* Background Canvas */}
      <CanvasBackground />
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack spacing={4}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">Hi {username}!</Typography>
              <Button onClick={handleSignOut} variant="outlined" sx={{ color: '#ccc', borderColor: '#555' }}>
                Logout
              </Button>
            </Box>

            {/* Error Display */}
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* NEO Search Form */}
            <NEOSearchForm onSearch={handleSearch} loading={searchLoading} />

            {/* NEO Display */}
            {Object.keys(neos).length > 0 && (
              <NEODisplay
                neos={neos}
                loading={searchLoading}
                onLoadMore={handleLoadMore}
                hasMoreData={true}
              />
            )}

            {/* Initial Loading State */}
            {Object.keys(neos).length === 0 && !searchLoading && (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  Use the search form above to find Near-Earth Objects
                </Typography>
              </Box>
            )}
          </Stack>
        </Container>
      </div>
    </div>

  );
}
