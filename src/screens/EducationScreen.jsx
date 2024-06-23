import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { getEducationList } from '../api/education';
import { useQuery } from '@tanstack/react-query';
import CustomThreeDecahedro from '../components/Threejs/CustomThreeDecahedro';

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60; // Random saturation between 60% and 80%
  return `linear-gradient(to right, hsl(${hue}, ${saturation}%, 50%), hsl(${(hue + 60) % 360}, ${saturation}%, 50%))`;
};

const EducationScreen = () => {
  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['educationList'],
    queryFn: getEducationList,
  });

  return (
    <Grid container justifyContent="center" alignItems="center" sx={ { height: '100vh' } }>
      <CustomThreeDecahedro />
      <Grid item xs={ 12 } md={ 84 } lg={ 4 } pt={ '9vh' } px={ 4 }>
        <Grid container spacing={ 4 } pb={ 5 }>
          { data?.data?.data?.map((education) => (
            <Grid item key={ education._id } xs={ 12 }>
              <Box
                sx={ {
                  background: getRandomColor(),
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  },
                  borderRadius: 3,
                  padding: 1,
                  textAlign: 'center',
                  color: '#fff',
                } }
              >
                <Typography fontSize={ 16 } sx={ { fontWeight: 'bold', letterSpacing: 0.5 } }>
                  { education.name }
                </Typography>
                <Typography>{ education?.place }</Typography>
                <Typography variant="body2">
                  { `${education.course}, ${education.marks_percentage}%` }
                </Typography>
                <Typography variant="body2">{ education.presentDate }</Typography>
              </Box>
            </Grid>
          )) }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EducationScreen;
