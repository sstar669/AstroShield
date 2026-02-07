"use client";

import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Stack,
  Link
} from "@mui/material";
import { Warning, Info } from "@mui/icons-material";
import { NEODetails } from "@/lib/nasa-api";
import { format } from "date-fns";

interface NEOCardProps {
  neo: NEODetails;
  onClick: () => void;
}

export default function NEOCard({ neo, onClick }: NEOCardProps) {
  const closestApproach = neo.close_approach_data[0];
  const avgDiameter = (
    (neo.estimated_diameter.kilometers.estimated_diameter_min + 
     neo.estimated_diameter.kilometers.estimated_diameter_max) / 2
  ).toFixed(2);

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        border: neo.is_potentially_hazardous_asteroid ? '2px solid #f44336' : '1px solid #e0e0e0',
        backgroundColor: '#f5f5f5',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
        }
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" component="h3" noWrap>
              {neo.name}
            </Typography>
            
            <Stack direction="row" spacing={1}>
              {neo.is_potentially_hazardous_asteroid && (
                <Chip
                  icon={<Warning />}
                  label="Hazardous"
                  color="error"
                  size="small"
                />
              )}
              <Chip
                icon={<Info />}
                label={`${avgDiameter} km`}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Box>

          {closestApproach && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Closest Approach: {format(new Date(closestApproach.close_approach_date), 'MMM dd, yyyy')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distance: {parseFloat(closestApproach.miss_distance.kilometers).toLocaleString()} km
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Velocity: {parseFloat(closestApproach.relative_velocity.kilometers_per_second).toFixed(2)} km/s
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Link 
              href={neo.nasa_jpl_url} 
              target="_blank" 
              rel="noopener noreferrer"
              variant="body2"
            >
              View on NASA JPL
            </Link>
            
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Click card for details
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
