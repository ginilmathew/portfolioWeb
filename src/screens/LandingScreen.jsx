/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import React from 'react'
import LandingLoader from '../components/common/landingLoader'
import { useNavigate } from 'react-router-dom'
import code from '../assets/images/code.jpg'
import { getAllvisitors } from '../api/visiters'
import { useQuery } from '@tanstack/react-query'
const LandingScreen = () => {

  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['getvisit'],
    queryFn: getAllvisitors,
  });

  const navigate = useNavigate()
  const styles = {
    paper: {
      padding: '2rem',
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',

    },
  };




  React.useEffect(() => {
    if (!isLoading) {
      const timeoutID = window.setTimeout(() => {
        navigate('/home')
      }, 2000);
      return () => window.clearTimeout(timeoutID);
    }

  }, [!isLoading]);

  return (
    <Box style={ { ...styles.image, backgroundImage: `url(${code})`, width: '100%' } }>
      <LandingLoader />
    </Box>
  )
}

export default LandingScreen