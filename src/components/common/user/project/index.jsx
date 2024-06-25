import { Box, Chip, Grid, Typography } from '@mui/material'
import React, { memo } from 'react'

const ProjectUserComponent = memo(({ project, p }) => {
  return (
    <Grid item key={ project?._id } xs={ 12 } sm={ 12 } md={ 4 }>
      <Box
        sx={ {
          minHeight: 230,
          Width: '100%',
          background: 'transparent',
          border: '1px solid #fff',
          borderRadius: 2, // Rounded corners
          transition: 'transform 0.3s ease-in-out',
          backdropFilter: 'blur(10px)', // Apply blur filter for glass effect
          WebkitBackdropFilter: 'blur(10px)', // Support for older browsers
          '&:hover': {
            transform: 'scale(1.02)', // Scale up slightly on hover
            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
          },
        } }
      >

        <Box sx={ { padding: 2 } }> {/* Adjust padding for content */ }
          <Typography variant="h5" gutterBottom sx={ { textAlign: 'center', color: `hsl(${p * 100}, 60%, 50%)`, fontFamily: 'Outfit-Bold' } }>
            { project.name }
          </Typography>
          <Typography color="text.secondary" sx={ { textAlign: 'initial', mb: 1, fontSize: 16, color: '#fff', letterSpacing: .5, fontFamily: 'Outfit-Regular' } }>
            { project.details }
          </Typography>
          <Typography variant="subtitle2" color="text.primary" sx={ { fontWeight: 'bold', mb: 1, color: '#fff', fontFamily: 'Outfit-Bold' } }>
            Technologies Used:
          </Typography>
          <Box sx={ { display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', py: 1 } }>
            { project?.technology_used?.map((tech, i) => (
              <Box key={ tech._id } >
                <Box>
                  <Chip sx={ { color: `hsl(${i * 100}, 60%, 50%)` } } label={ tech.name } size="medium" variant="outlined" color="primary" />
                </Box>
              </Box>
            )) }
          </Box>
        </Box>
      </Box>
    </Grid>
  )
})

export default ProjectUserComponent