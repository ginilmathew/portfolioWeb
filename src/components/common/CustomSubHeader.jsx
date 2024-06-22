
import { Box, Typography } from '@mui/material'
import React from 'react'
import { COLORS } from '../../assets/colors'

const CustomSubHeader = () => {

  return (
    <Box sx={ { height: 120, background: COLORS.primary, position: 'fixed', zIndex: 1, width: '100%' } }>

    </Box>
  )
}

export default CustomSubHeader
