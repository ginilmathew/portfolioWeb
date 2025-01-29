import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { getEducationList } from '../api/education';
import { useQuery } from '@tanstack/react-query';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';

const EducationScreen = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['educationList'],
    queryFn: getEducationList,
  });

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <CustomThreeStar />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6, color: theme.palette.text.primary }}>
          Education
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            justifyContent: 'center',
          }}
        >
          {data?.data?.data?.map((education) => (
            <Grid item key={education._id} xs={12} sm={6} md={4}>
              <Box
                sx={{
                  background: theme.palette.background.paper,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                  },
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'center',
                  color: theme.palette.text.primary,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 0.5, mb: 2 }}>
                  {education.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                  {education?.place}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {`${education.course}, ${education.marks_percentage}%`}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {education.presentDate}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EducationScreen;
