"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Alert
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, addDays } from "date-fns";

interface NEOSearchFormProps {
  onSearch: (startDate: string, endDate: string) => void;
  loading: boolean;
}

export default function NEOSearchForm({ onSearch, loading }: NEOSearchFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 7));
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (startDate > endDate) {
      setError("Start date must be before end date");
      return;
    }

    setError(null);
    onSearch(
      format(startDate, "yyyy-MM-dd"),
      format(endDate, "yyyy-MM-dd")
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3} sx={{ color: '#fff' }}>
        <Typography variant="h5" component="h2" sx={{ color: '#fff' }}>
          Search Near-Earth Objects
        </Typography>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              color: '#fff',
              '& .MuiAlert-icon': { color: '#fff' },
              '& .MuiAlert-message': { color: '#fff' },
              '& .MuiButtonBase-root.MuiIconButton-root': { color: '#fff' },
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" noValidate>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    sx: {
                      bgcolor: '#1f2937',
                      input: { color: '#fff' },
                      label: { color: '#fff !important' },
                      '& .MuiOutlinedInput-root': {
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
                      '& .MuiFormHelperText-root': {
                        color: '#fff',
                      }
                    }
                  }
                }}
              />

              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    sx: {
                      bgcolor: '#1f2937',
                      input: { color: '#fff' },
                      label: { color: '#fff !important' },
                      '& .MuiOutlinedInput-root': {
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
                      '& .MuiFormHelperText-root': {
                        color: '#fff',
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>

            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading || !startDate || !endDate}
              sx={{ minWidth: 120 }}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>


  );
}
