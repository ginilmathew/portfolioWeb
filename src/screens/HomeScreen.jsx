/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { getProfile } from '../api/home';
import me from '../assets/me.jpg';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import CustomThreeGeometry from '../components/Threejs/CustomThreeGeometry';






const HomeScreen = () => {
  // Data fetching using react-query
  // eslint-disable-next-line no-unused-vars

  const location = useLocation()

  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['getme'],
    queryFn: getProfile,
  });



  // Inline styles for the components
  const styles = {
    resumeContainer: {
      height: '95vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

    },
    leftSide: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
    },
    avatar: {
      width: '100%',
      height: 'auto',
      maxWidth: '250px',
      maxHeight: '250px',
      boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
      transition: 'transform 0.5s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    rightSide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '600px',
      textAlign: 'center',
    },
    fadeIn: {
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out',
    },
  };

  return (
    <Box sx={ styles.resumeContainer }>

      <CustomThreeGeometry />
      {/* Left side */ }
      <Grid item xs={ 12 } md={ 4 } sx={ styles.leftSide }>
        <Avatar variant='square' src={ "" } alt="Profile Image" sx={ styles.avatar } />
      </Grid>

      {/* Right side */ }
      <Grid item xs={ 12 } md={ 8 } sx={ styles.rightSide }>
        <Typography variant="h5" sx={ { marginBottom: 2, color: '#000', fontWeight: 'bold' } }>
          { data?.data?.designation }
        </Typography>

        <Typography variant="h5" sx={ { marginBottom: 2, color: '#000', fontWeight: 'bold' } }>
          About Me
        </Typography>
        <Typography variant="body1" sx={ { marginBottom: 2, color: '#000', textAlign: 'justify', letterSpacing: 1, px: 2 } }>
          { data?.data?.bio }
        </Typography>
        <Typography variant="h5" sx={ { marginBottom: 2, color: '#000', fontWeight: 'bold', } }>
          Experience
        </Typography>
        <Typography variant="body1" sx={ { marginBottom: 1, color: '#555', fontSize: 20, px: 2 } }>
          { data?.data?.experience }
        </Typography>

      </Grid>
    </Box>
  );
};

export default HomeScreen;
