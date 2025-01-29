import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { getEducationList } from '../api/education';
import { useQuery } from '@tanstack/react-query';
import CustomThreeDecahedro from '../components/Threejs/CustomThreeDecahedro';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60; // Random saturation between 60% and 80%
  return `linear-gradient(135deg, hsl(${hue}, ${saturation}%, 50%), hsl(${(hue + 60) % 360}, ${saturation}%, 50%))`;
};

const EducationScreen = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['educationList'],
    queryFn: getEducationList,
  });

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', backgroundColor: theme.palette.background.default }}>
      <CustomThreeStar />
      <Grid item xs={12} md={8} lg={6} pt={'10vh'} px={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: theme.palette.text.primary }}>
          Education
        </Typography>
        <Grid container spacing={4} pb={5}>
          {data?.data?.data?.map((education) => (
            <Grid item key={education._id} xs={12}>
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
      </Grid>
    </Grid>
  );
};

export default EducationScreen;
