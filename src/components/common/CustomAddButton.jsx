import { Grid } from '@mui/material'
import React from 'react'
import CustomButton from './CustomButton'

const CustomAddButton = ({ ClickEvent }) => {
  return (
    <Grid container py={ 1 } px={ 2 }>
      {/* Grid items for extra small devices (screen width < 600px) */ }
      <Grid item xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }></Grid>
      <Grid item xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }></Grid>
      <Grid item xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }></Grid>
      <Grid item xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }></Grid>
      <Grid item xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }></Grid>
      {/* Grid item for small, medium, large, and extra large devices */ }
      <Grid item xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 } justifyContent="flex-end" display="flex">
        <CustomButton
          onClick={ ClickEvent }
          width="70%"
          label="Add"
          isIcon={ false }
        />
      </Grid>
    </Grid>
  )
}

export default CustomAddButton
