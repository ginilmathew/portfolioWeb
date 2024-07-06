/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Box, Grid, Typography, Container, Button, Hidden } from '@mui/material';
import { getProfile } from '../api/home';
import { useQuery } from '@tanstack/react-query';
import CustomThreeGeometry from '../components/Threejs/CustomThreeGeometry';
import "./animation.css";
import { BASE_URL, IMAGEURL } from '../config';
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
      width: '100%',
      height: 'auto',
      maxWidth: '230px',
      maxHeight: '230px',
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


  return (
    <Box sx={ [styles.resumeContainer, { px: { xl: 10, lg: 10, md: 4, xs: 2, sm: 2 } }] }>
      <CustomThreeStar />
      <Grid container spacing={ 3 } pt={ '9vh' }>
        {/* Left side */ }
        <Grid item xs={ 12 } md={ 4 } sx={ [styles.leftSide] }>
          <Avatar variant='square' src={ data?.data?.profileImg } alt="Profile Image" sx={ styles.avatar } />
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
    </Box>
  );
};

export default HomeScreen;
