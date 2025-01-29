import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { getEducationList } from '../api/education';
import { useQuery } from '@tanstack/react-query';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60; // Random saturation between 60% and 80%
  return `linear-gradient(135deg, hsl(${hue}, ${saturation}%, 50%), hsl(${(hue + 60) % 360}, ${saturation}%, 50%))`;
};

const EducationScreen = () => {
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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: 'text.primary' }}>
          Education
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            flexWrap: 'nowrap', // Prevent wrapping to ensure row-wise layout
            overflowX: 'auto', // Allow horizontal scrolling if content overflows
            paddingBottom: 2, // Add some padding to avoid overlap with scrollbar
            width: '90%', // Limit width to ensure cards don't overflow the viewport
            mx: 'auto', // Center the grid horizontally
          }}
        >
          {data?.data?.data?.map((education) => (
            <Grid item key={education._id} xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  background: getRandomColor(),
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  },
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minWidth: '250px', // Ensure cards have a minimum width
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 0.5, mb: 1 }}>
                  {education.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {education?.place}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {`${education.course}, ${education.marks_percentage}%`}
                </Typography>
                <Typography variant="body2">
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
