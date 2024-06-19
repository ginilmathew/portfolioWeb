/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default HomeLayout