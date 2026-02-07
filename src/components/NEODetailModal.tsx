"use client";

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  Typography, 
  Box, 
  Stack, 
  Chip, 
  Link, 
  Button,
  Divider
} from "@mui/material";
import { Close, Warning, Info, Speed, Straighten, CalendarToday } from "@mui/icons-material";
import { NEODetails } from "@/lib/nasa-api";
import { format, parseISO } from "date-fns";

interface NEODetailModalProps {
  open: boolean;
  onClose: () => void;
  neo: NEODetails | null;
}

export default function NEODetailModal({ open, onClose, neo }: NEODetailModalProps) {
  if (!neo) return null;

  const closestApproach = neo.close_approach_data[0];
  const avgDiameter = (
    (neo.estimated_diameter.kilometers.estimated_diameter_min + 
     neo.estimated_diameter.kilometers.estimated_diameter_max) / 2
  ).toFixed(2);

  const formatDistance = (distance: string) => {
    const num = parseFloat(distance);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)} million km`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)} thousand km`;
    }
    return `${num.toFixed(2)} km`;
  };

  const formatVelocity = (velocity: string) => {
    const num = parseFloat(velocity);
    return `${num.toFixed(2)} km/s`;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          backgroundColor: '#f5f5f5'
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" component="h2">
            {neo.name}
          </Typography>
          {neo.is_potentially_hazardous_asteroid && (
            <Chip
              icon={<Warning />}
              label="Potentially Hazardous"
              color="error"
              size="medium"
            />
          )}
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Info color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Average Diameter: <strong>{avgDiameter} km</strong>
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Info color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Absolute Magnitude: <strong>{neo.absolute_magnitude_h}</strong>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Close Approach Data */}
          {closestApproach && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Closest Approach Details
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarToday color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Date: <strong>{format(parseISO(closestApproach.close_approach_date), 'MMMM dd, yyyy')}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Speed color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Velocity: <strong>{formatVelocity(closestApproach.relative_velocity.kilometers_per_second)}</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Straighten color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Miss Distance: <strong>{formatDistance(closestApproach.miss_distance.kilometers)}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Info color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Orbiting Body: <strong>{closestApproach.orbiting_body}</strong>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          <Divider />

          {/* Additional Details */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This Near-Earth Object (NEO) has been tracked by NASA&apos;s Jet Propulsion Laboratory. 
              {neo.is_potentially_hazardous_asteroid && (
                <span style={{ color: '#f44336', fontWeight: 'bold' }}>
                  {' '}It has been classified as potentially hazardous due to its size and proximity to Earth.
                </span>
              )}
            </Typography>
            
            <Box mt={2}>
              <Link 
                href={neo.nasa_jpl_url} 
                target="_blank" 
                rel="noopener noreferrer"
                variant="body2"
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                <Info />
                View detailed information on NASA JPL website
              </Link>
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
