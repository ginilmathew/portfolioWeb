/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Chip, CardMedia, Box } from '@mui/material';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import { useQuery } from '@tanstack/react-query';
import { getProjectList } from '../api/project';



const ProjectScreen = () => {

  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['projectList'],
    queryFn: getProjectList,
  });

  return (
    <>
      <CustomThreeStar />
      <Grid container spacing={ 6 } justifyContent="center" alignItems="center" py={ 10 } px={ 10 }>

        { data?.data?.data?.map((project) => (
          <Grid item key={ project._id } xs={ 12 } sm={ 6 } md={ 4 }>
            <Box
              sx={ {
                minHeight: 250,
                background: 'transparent',
                border: '1px solid #fff',
                borderRadius: 3, // Rounded corners
                transition: 'transform 0.3s ease-in-out',
                backdropFilter: 'blur(10px)', // Apply blur filter for glass effect
                WebkitBackdropFilter: 'blur(10px)', // Support for older browsers
                '&:hover': {
                  transform: 'scale(1.08)', // Scale up slightly on hover
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
                },
              } }
            >

              <Box sx={ { padding: 3 } }> {/* Adjust padding for content */ }
                <Typography variant="h5" gutterBottom sx={ { textAlign: 'center', color: '#3f51b5' } }>
                  { project.name }
                </Typography>
                <Typography color="text.secondary" sx={ { textAlign: 'initial', mb: 1, fontSize: 16, color: '#fff', letterSpacing: .5 } }>
                  { project.details }
                </Typography>
                <Typography variant="subtitle2" color="text.primary" sx={ { fontWeight: 'bold', mb: 1, color: '#fff' } }>
                  Technologies Used:
                </Typography>
                <Box sx={ { display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', py: 1 } }>
                  { project?.technology_used?.map((tech) => (
                    <Box key={ tech._id } >
                      <ListItemIcon>
                        <Chip label={ tech.name } size="medium" variant="outlined" color="primary" />
                      </ListItemIcon>
                    </Box>
                  )) }
                </Box>
              </Box>
            </Box>
          </Grid>
        )) }
      </Grid>
    </>

  );
};

export default ProjectScreen;
