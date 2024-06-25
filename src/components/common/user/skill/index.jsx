import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'

const SkillUserComponent = memo(({ skill, index }) => {
  return (
    <Box
      key={ skill._id }
      height={ 80 }
      width={ 200 }
      sx={ {
        backgroundColor: `hsl(${index * 30}, 65%, 70%)`, // Different color for each box
        transition: 'transform 0.5s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)' // Box-shadow effect on hover
        },
        boxShadow: 10,
        borderRadius: 3,
        padding: 2,
        textAlign: 'center',
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

      } }
    >
      <Typography sx={ { fontSize: 16, fontFamily: 'Outfit-Bold', color: "#fff", letterSpacing: .5, py: 1 } }>{ skill.name }</Typography>
      <Typography sx={ { fontSize: 14, color: "#fff", letterSpacing: 1, fontFamily: 'Outfit-Medium' } }>{ skill.proficiency }</Typography>
    </Box>
  )
})

export default SkillUserComponent