import React from 'react'
import { StyleSheet } from '../../assets/styles'
import { Box } from '@mui/material'
import CustomBreadcrub from './CustomBreadcrub'

const CustomOutletBox = ({ children }) => {
  return (
    <Box sx={ { position: 'relative', zIndex: 100, boxShadow: 2, } }>
      <Box sx={ { position: 'absolute', top: 3 } }>
        <CustomBreadcrub />
        <Box width={ {
          xs: '100vw',
          lg: '81vw',

        } } bgcolor={ '#ffff' } sx={ { ...StyleSheet.outletCSS, borderStartEndRadius: 8, borderStartStartRadius: 8 } }>
          { children }
        </Box>
      </Box>
    </Box>
  )
}

export default CustomOutletBox
