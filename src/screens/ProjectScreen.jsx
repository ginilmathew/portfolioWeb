/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Chip, CardMedia, Box } from '@mui/material';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import { useQuery } from '@tanstack/react-query';
import { getProjectList } from '../api/project';
import ProjectUserComponent from '../components/common/user/project';



const ProjectScreen = () => {

  const { data } = useQuery({
    queryKey: ['projectList'],
    queryFn: getProjectList,
  });

  return (
    <Box sx={ { height: '100vh' } }>
      <CustomThreeStar />
      <Box
        px={ 3 }
        sx={ {
          pt: '9vh'
        } }
      >
        <Grid container spacing={ 6 } justifyContent="center" alignItems="center" pb={ 8 }>

          { data?.data?.data?.map((project, p) => (
            <ProjectUserComponent project={ project } key={ p } p={ p } />
          )) }
        </Grid>
      </Box>
    </Box>

  );
};

export default ProjectScreen;
