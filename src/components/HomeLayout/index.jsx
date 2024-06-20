/* eslint-disable no-unused-vars */
import { Box, colors } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Stack sx={ { width: '100%', color: '#fff', } } pt={ '6vh' } position={ 'absolute' }>
        <Box width={ '100%' } height={ 2 } sx={ { background: '#f5f5f5' } }></Box>
      </Stack>
      <Outlet />
    </>
  )
}

export default HomeLayout