/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomThreeDecahedro from '../components/Threejs/CustomThreeDecahedro';
import { getEducationList } from '../api/education';
import { useQuery } from '@tanstack/react-query';



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
    <Box sx={ { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
      <CustomThreeDecahedro />
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
        } }
      >
        { data?.data?.data?.map((education) => (
          <Box
            key={ education._id }
            sx={ {
              width: '100%',
              background: getRandomColor(),
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              },
              borderRadius: 3,
              padding: 2,
              textAlign: 'center',
              color: '#fff',
            } }
          >
            <Typography variant="h8" sx={ { fontWeight: 'bold', mb: 1, letterSpacing: .5 } }>{ education.name }</Typography>
            <Typography variant="h9">{ education?.place }</Typography>
            <Typography fontSize={ 12 } py={ 1 }>{ `${education.course}, ${education.marks_percentage}%` }</Typography>
            <Typography fontSize={ 12 }>{ education.presentDate }</Typography>
          </Box>
        )) }
      </Box>
    </Box>
  );
};

export default EducationScreen;
