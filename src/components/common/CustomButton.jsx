import { Box, Button, CircularProgress } from '@mui/material'
import React from 'react'
import { COLORS } from '../../assets/colors'


const CustomButton = ({ label, active, onClick, loading, disable, isIcon, ICON, width }) => {
    return (

        <Button onClick={onClick}
            disabled={disable}
            endIcon={isIcon ? <ICON color='#fff' /> : null}
            sx={{
                ':hover': {
                    bgcolor: COLORS?.secondary, // theme.palette.primary.main
                    boxShadow: 4,
                    color: '#fff'
                },
                fontFamily: 'Outfit-Regular',
                borderRadius: 2,
                backgroundColor: active ? COLORS?.secondary : COLORS?.secondary,
                padding: "9px 18px",
                fontSize: "14px",
                color: "#fff",
                fontWeight: 'bold',
                letterSpacing: 1,
                width: width ? width : 'unset'
            }}
        >
            {loading ? <CircularProgress /> : label}
        </Button>

    )
}

export default CustomButton