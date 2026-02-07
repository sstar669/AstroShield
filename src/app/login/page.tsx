'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Container, Typography, Alert, Stack, Button } from '@mui/material';
import Loading from '@/components/loading';
import CanvasBackground from '@/app/components/CanvasBackground';
import { GitHub, Google } from '@mui/icons-material';

export default function LoginPage() {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ✅ FIXED HERE

  useEffect(() => {
    try {
      setSupabaseClient(createClient());
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to initialize auth';
      setError(msg);
    }
  }, []);

  const redirectTo = useMemo(
    () => (typeof window !== 'undefined' ? `${window.location.origin}/home` : undefined),
    []
  );

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    const { error } = await supabaseClient?.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    }) ?? {};
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 flex items-center justify-center">
      <CanvasBackground />
      <div className="absolute inset-0 bg-black/70" />

      <Container maxWidth="sm" className="relative z-10">
        <Stack spacing={4} alignItems="center">
          <Typography variant="h4" component="h1" color="white">
            Sign in to Your Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Loading />
          ) : (
            <Stack spacing={2} width="100%">
              <Button
                variant="contained"
                startIcon={<Google />}
                onClick={() => handleOAuthLogin('google')}
                sx={{
                  backgroundColor: '#ea4335',
                  '&:hover': { backgroundColor: '#d0382f' },
                  color: 'white',
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Continue with Google
              </Button>

              <Button
                variant="contained"
                startIcon={<GitHub />}
                onClick={() => handleOAuthLogin('github')}
                sx={{
                  backgroundColor: '#333',
                  '&:hover': { backgroundColor: '#000' },
                  color: 'white',
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Continue with GitHub
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>
    </div>
  );
}
