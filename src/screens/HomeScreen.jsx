/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Box, Grid, Typography, Container, Button, Hidden, IconButton } from '@mui/material';
import { getProfile } from '../api/home';
import { useQuery } from '@tanstack/react-query';
import { Visibility } from '@mui/icons-material';
import "./animation.css";
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import CustomButton from '../components/common/CustomButton';
import pdf from '../assets/pdf/ginil.pdf'
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

      // background: '#000'
    },
    leftSide: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      marginTop: { xl: '100px', lg: "100px", md: "10px", sm: "10px", xs: "10px" },
    },
    avatar: {

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
      marginTop: '80px',
    },
    fadeIn: {
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out',
    },
  };
  const DownloadButton = () => {
    window.open(pdf, '_blank');
  };

  console.log({ data: data?.data })


  return (
    <Box sx={ [styles.resumeContainer, { px: { xl: 10, lg: 10, md: 4, xs: 2, sm: 2 } }] }>
      <CustomThreeStar />
      <Grid container spacing={ 3 } pt={ '9vh' }>
        {/* Left side */ }
        <Grid item xs={ 12 } md={ 4 } sx={ [styles.leftSide, { height: 300 }] }>
          <Avatar variant='square' src={ data?.data?.profileImg } alt="Profile Image" sx={ [styles.avatar, { height: 250, width: 250, borderRadius: 20, objectFit: 'cover' }] } />
        </Grid>
        {/* Right side */ }
        <Grid item xs={ 12 } md={ 8 } sm={ 12 } sx={ styles.rightSide }>
          {/* Existing content */ }
          { isLoading ? (
            <Typography variant="h6" sx={ { marginBottom: 2, color: '#fff', fontWeight: 'bold', letterSpacing: 1 } }>
              Loading...
            </Typography>
          ) : (
            <>
              <Typography variant="h6" sx={ { marginBottom: 2, color: '#fff', fontFamily: 'Outfit-ExtraBold', letterSpacing: 1 } }>
                { data?.data?.fullname }
              </Typography>
              <Typography
                variant="h6"
                sx={ {
                  marginBottom: 2,
                  color: "#fff",
                  fontFamily: 'Outfit-ExtraBold',
                  '&.animated-text': {
                    animation: 'zoomInOut 5s ease-in-out infinite',
                  },
                } }
                className="animated-text"
              >
                { data?.data?.designation }
              </Typography>
              <Typography variant="h6" sx={ { marginBottom: 2, color: '#f50057', letterSpacing: 1, fontFamily: 'Outfit-ExtraBold' } }>
                About Me
              </Typography>
              <Typography variant="body1" sx={ { marginBottom: 2, color: '#fff', textAlign: 'justify', letterSpacing: 1, px: 3, fontFamily: 'Outfit-Regular' } }>
                { data?.data?.bio }
              </Typography>
              <Typography variant="h6" sx={ { color: '#f50057', letterSpacing: 1, marginBottom: 2, fontFamily: 'Outfit-ExtraBold' } }>
                Experience
              </Typography>
              <Typography sx={ { color: '#f5f5f5', fontSize: 18, letterSpacing: 1, paddingBottom: 5, fontFamily: 'Regular' } }>
                { data?.data?.experience }
              </Typography>
            </>
          ) }
        </Grid>
        { !isLoading &&
          <Grid item xs={ 12 } md={ 12 } py={ 1 } sx={ { display: 'flex', justifyContent: 'flex-end' } }>
            <CustomButton
              onClick={ DownloadButton }
              width={ { xl: "15%", lg: "15%", md: "25%", sm: "40%", xs: "100%" } }
              label={ 'Downlode Resume' }
              isIcon={ false }
            />
          </Grid> }

      </Grid>
      <Box
        sx={ {
          position: 'absolute',
          bottom: 0,
          right: 20,
          backgroundColor: 'transparent', // Set background color to transparent
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 999,
          animation: 'fadeIn 1s ease-in-out', // Animation to fade in
          display: 'flex',
          alignItems: 'center',
        } }
      >
        <Visibility fontSize="small" />
        <Typography sx={ { mx: 1 } }>{ data?.data?.visitCount }</Typography>
      </Box>
    </Box>
  );
};

export default HomeScreen;
