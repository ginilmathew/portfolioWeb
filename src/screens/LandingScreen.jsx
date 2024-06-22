/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import React from 'react'
import LandingLoader from '../components/common/landingLoader'
import { PostLogin } from '../api/login'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const LandingScreen = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      navigate('/home')
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  }, []);

  return (
    <Box>
      <LandingLoader />
    </Box>
  )
}

export default LandingScreen