"use client";

import { useState, useMemo } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox,
  Button,
  CircularProgress
} from "@mui/material";
import { NEODetails } from "@/lib/nasa-api";
import NEOCard from "./NEOCard";
import NEODetailModal from "./NEODetailModal";
import { parseISO } from "date-fns";

interface NEODisplayProps {
  neos: Record<string, NEODetails[]>;
  loading: boolean;
  onLoadMore: () => void;
  hasMoreData: boolean;
}

type SortOption = "date_asc" | "date_desc" | "name_asc" | "name_desc" | "size_asc" | "size_desc";

export default function NEODisplay({ neos, loading, onLoadMore, hasMoreData }: NEODisplayProps) {
  const [hazardousFilter, setHazardousFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("date_asc");
  const [selectedNEO, setSelectedNEO] = useState<NEODetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Flatten and filter NEOs
  const filteredAndSortedNeos = useMemo(() => {
    let allNeos: Array<{ neo: NEODetails; date: string }> = [];
    
    // Flatten the date-grouped structure
    Object.entries(neos).forEach(([date, neosForDate]) => {
      neosForDate.forEach(neo => {
        allNeos.push({ neo, date });
      });
    });

    // Apply hazardous filter
    if (hazardousFilter) {
      allNeos = allNeos.filter(({ neo }) => neo.is_potentially_hazardous_asteroid);
    }

    // Apply sorting
    allNeos.sort((a, b) => {
      switch (sortBy) {
        case "date_asc":
          return parseISO(a.date).getTime() - parseISO(b.date).getTime();
        case "date_desc":
          return parseISO(b.date).getTime() - parseISO(a.date).getTime();
        case "name_asc":
          return a.neo.name.localeCompare(b.neo.name);
        case "name_desc":
          return b.neo.name.localeCompare(a.neo.name);
        case "size_asc":
          const sizeA = (a.neo.estimated_diameter.kilometers.estimated_diameter_min + 
                        a.neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          const sizeB = (b.neo.estimated_diameter.kilometers.estimated_diameter_min + 
                        b.neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          return sizeA - sizeB;
        case "size_desc":
          const sizeC = (a.neo.estimated_diameter.kilometers.estimated_diameter_min + 
                        a.neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          const sizeD = (b.neo.estimated_diameter.kilometers.estimated_diameter_min + 
                        b.neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          return sizeD - sizeC;
        default:
          return 0;
      }
    });

    return allNeos;
  }, [neos, hazardousFilter, sortBy]);

  const handleViewDetails = (neo: NEODetails) => {
    setSelectedNEO(neo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNEO(null);
  };

  if (Object.keys(neos).length === 0) {
    return null;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4, color: '#fff' }}>
  <Stack spacing={3}>
    {/* Filters and Sorting */}
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
      alignItems="center"
      sx={{ color: '#fff' }}
    >
      <FormControl
        size="small"
        sx={{
          minWidth: 200,
          '& .MuiInputLabel-root': { color: '#fff' },
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
          '& .MuiSelect-icon': {
            color: '#fff',
          }
        }}
      >
        <InputLabel sx={{ color: '#fff' }}>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          sx={{
            color: '#fff',
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#121212',
                color: '#fff',
                '& .MuiMenuItem-root': {
                  color: '#fff',
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: '#3b82f6',
                },
                '& .MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: '#2563eb',
                },
              },
            },
          }}
        >
          <MenuItem value="date_asc">Date (Earliest First)</MenuItem>
          <MenuItem value="date_desc">Date (Latest First)</MenuItem>
          <MenuItem value="name_asc">Name (A-Z)</MenuItem>
          <MenuItem value="name_desc">Name (Z-A)</MenuItem>
          <MenuItem value="size_asc">Size (Smallest First)</MenuItem>
          <MenuItem value="size_desc">Size (Largest First)</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={hazardousFilter}
            onChange={(e) => setHazardousFilter(e.target.checked)}
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#3b82f6',
              },
            }}
          />
        }
        label={<Typography sx={{ color: '#fff' }}>Show Only Potentially Hazardous</Typography>}
      />

      <Typography variant="body2" sx={{ color: '#dceb10ff' }}>
        {filteredAndSortedNeos.length} NEOs found
      </Typography>
    </Box>

    {/* NEO Grid */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {filteredAndSortedNeos.map(({ neo }) => (
        <Box key={neo.id}>
          <NEOCard neo={neo} onClick={() => handleViewDetails(neo)} />
        </Box>
      ))}
    </Box>

    {/* Load More Button */}
    {hasMoreData && (
      <Box display="flex" justifyContent="center" pt={2}>
        <Button
          variant="outlined"
          onClick={onLoadMore}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : null}
          sx={{ color: '#fff', borderColor: '#fff', '&:hover': { borderColor: '#3b82f6', color: '#3b82f6' } }}
        >
          {loading ? "Loading..." : "Load More Data"}
        </Button>
      </Box>
    )}

    {loading && (
      <Box display="flex" justifyContent="center" pt={2}>
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    )}
  </Stack>
</Container>


      {/* NEO Detail Modal */}
      <NEODetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        neo={selectedNEO}
      />
    </>
  );
}
