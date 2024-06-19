/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import React from 'react'
import LandingLoader from '../components/common/landingLoader'
import { PostLogin } from '../api/login'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const LandingScreen = () => {
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: PostLogin,
    onSuccess: async (data) => {
      localStorage.setItem("token", data.data.token)
    },
    onError: (error, variables, context) => {

    },
  })

  React.useEffect(() => {
    mutate({ username: 'ginil', password: 'password' })
    const timeoutID = window.setTimeout(() => {
      navigate('/home')
    }, 5000);

    return () => window.clearTimeout(timeoutID);
  }, []);

  return (
    <Box>
      <LandingLoader />
    </Box>
  )
}

export default LandingScreen