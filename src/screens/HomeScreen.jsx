/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Box, Grid, Typography, Container } from '@mui/material';
import { getProfile } from '../api/home';
import { useQuery } from '@tanstack/react-query';
import CustomThreeGeometry from '../components/Threejs/CustomThreeGeometry';
import "./animation.css";
import { IMAGEURL } from '../config';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';

const HomeScreen = () => {
  // Data fetching using react-query
  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['getme'],
    queryFn: getProfile,
  });

  const styles = {
    resumeContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // background: '#000'
    },
    leftSide: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
      marginTop: '50px',
    },
    avatar: {
      width: '100%',
      height: 'auto',
      maxWidth: '200px',
      maxHeight: '200px',
      objectFit: 'cover',
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
    <Box sx={ [styles.resumeContainer, { px: 10 }] }>
      <CustomThreeStar />
      <Grid container spacing={ 3 }>
        {/* Left side */ }
        <Grid item xs={ 12 } md={ 4 } sx={ styles.leftSide }>
          <Avatar variant='square' src={ IMAGEURL + data?.data?.profileImg } alt="Profile Image" sx={ styles.avatar } />
        </Grid>
        {/* Right side */ }
        <Grid item xs={ 12 } md={ 8 } sm={ 12 } sx={ styles.rightSide }>
          {/* Display "Loading..." if data is still loading */ }
          { isLoading ? (
            <Typography variant="h6" sx={ { marginBottom: 2, color: '#fff', fontWeight: 'bold', letterSpacing: 1 } }>
              Loading...
            </Typography>
          ) : (
            <>
              <Typography variant="h6" sx={ { marginBottom: 2, color: '#fff', fontWeight: 'bold', letterSpacing: 1 } }>
                { data?.data?.fullname }
              </Typography>
              <Typography
                variant="h6"
                sx={ {
                  marginBottom: 2,
                  color: "#fff",
                  fontWeight: 'bold',
                  '&.animated-text': {
                    animation: 'zoomInOut 5s ease-in-out infinite',
                  },
                } }
                className="animated-text"
              >
                { data?.data?.designation }
              </Typography>
              <Typography variant="h6" sx={ { marginBottom: 2, color: '#f50057', fontWeight: 'bold', letterSpacing: 1 } }>
                About Me
              </Typography>
              <Typography variant="body1" sx={ { marginBottom: 2, color: '#fff', textAlign: 'justify', letterSpacing: 1, px: 3 } }>
                { data?.data?.bio }
              </Typography>
              <Typography variant="h6" sx={ { color: '#f50057', fontWeight: 'bold', letterSpacing: 1, marginBottom: 2 } }>
                Experience
              </Typography>
              <Typography sx={ { color: '#f5f5f5', fontSize: 18, letterSpacing: 1, paddingBottom: 5 } }>
                { data?.data?.experience }
              </Typography>
            </>
          ) }
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
