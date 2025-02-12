import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { getEducationList } from '../api/education';
import { useQuery } from '@tanstack/react-query';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';

const EducationScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['educationList'],
    queryFn: getEducationList,
  });

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', position: 'relative',mb:10 }}>
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
          padding: isMobile ? 2 : 4,
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: isMobile ? 4 : 6,
            color: theme.palette.text.primary,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Education
        </Typography>
        <Grid
          container
          spacing={isMobile ? 2 : 4}
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
                  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  },
                  borderRadius: 2,
                  padding: isMobile ? 2 : 3,
                  textAlign: 'center',
                  color: theme.palette.text.primary,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: `1px solid ${theme.palette.divider}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 'bold',
                    letterSpacing: 0.5,
                    mb: 2,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {education.name}
                </Typography>
                <Typography
                  variant={isMobile ? 'body2' : 'subtitle1'}
                  sx={{ mb: 2, color: theme.palette.text.secondary }}
                >
                  {education?.place}
                </Typography>
                <Typography
                  variant={isMobile ? 'body2' : 'body1'}
                  sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}
                >
                  {`${education.course}, ${education.marks_percentage}%`}
                </Typography>
                <Typography
                  variant={isMobile ? 'caption' : 'body2'}
                  sx={{ color: theme.palette.text.secondary }}
                >
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
