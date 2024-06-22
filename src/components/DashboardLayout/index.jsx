import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CustomHeader from '../common/CustomHeader'
import { Box, Grid, Hidden, Popover, Typography } from '@mui/material'
import Sidebar from '../common/Sidebar'
import CustomSubHeader from '../common/CustomSubHeader'


const DashboardLayout = () => {


    return (
        <>
            <Box>
                <CustomHeader />
            </Box>

            <Grid container width={ '100%' } pt={ 7 } >
                {/* <Grid item xs={ 12 } sx={ { display: 'flex' } }> */ }
                <Hidden mdDown>
                    <Grid item lg={ 2.1 } overflow={ 'hidden' }>
                        <Sidebar />
                    </Grid>
                </Hidden>
                <Grid item lg={ 9.9 } >
                    <CustomSubHeader />
                    <Outlet />
                </Grid>
                {/* </Grid> */ }

            </Grid>

        </>
    )
}

export default DashboardLayout;
