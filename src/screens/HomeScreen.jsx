/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { getProfile } from '../api/home';
import me from '../assets/me.jpg';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import CustomThreeGeometry from '../components/Threejs/CustomThreeGeometry';
import "./animation.css"

const HomeScreen = () => {
  // Data fetching using react-query
  // eslint-disable-next-line no-unused-vars


  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['getme'],
    queryFn: getProfile,
  });



  const styles = {
    resumeContainer: {
      height: '100vh',
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
        <Typography variant="h6" sx={ { marginBottom: 2, color: '#fff', fontWeight: 'bold', letterSpacing: 1 } }>
          { data?.data?.fullname }
        </Typography>
        <Typography
          variant="h6"
          sx={ {
            marginBottom: 2,
            color: "#fff",
            fontWeight: 'bold',
            '&.animated-text': { /* Target the animation class for styles */
              animation: 'zoomInOut 5s ease-in-out infinite', /* Animation properties */
            },
          } }
          className="animated-text" // Apply the class for targeting
        >
          { data?.data?.designation }
        </Typography>
        <Typography variant="h7" sx={ { marginBottom: 2, color: '#fff', fontWeight: 'bold', letterSpacing: 1 } }>
          About Me
        </Typography>
        <Typography variant="body1" sx={ { marginBottom: 2, color: '#fff', textAlign: 'justify', letterSpacing: 1, px: 3 } }>
          { data?.data?.bio }
        </Typography>
        <Typography variant="h7" sx={ { color: '#fff', fontWeight: 'bold', pb: 2, letterSpacing: 1 } }>
          Experience
        </Typography>
        <Typography sx={ { color: '#f5f5f5', fontSize: 18, letterSpacing: 1 } }>
          { data?.data?.experience }
        </Typography>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
