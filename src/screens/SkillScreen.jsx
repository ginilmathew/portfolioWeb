/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { getAllSkill } from '../api/skill';
import { useQuery } from '@tanstack/react-query';
import CustomThreeDecahedro from '../components/Threejs/CustomThreeDecahedro';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import SkillUserComponent from '../components/common/user/skill';




const SkillScreen = () => {
  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['getSkills'],
    queryFn: getAllSkill,
  });


  return (
    <Box sx={ { height: '100vh' } }>
      <CustomThreeStar />
      <Box
        sx={ {
          px: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          alignItems: 'initial',
          justifyContent: 'center',
          pt: '9vh',
          pb: 8,
        } }
      >
        { data?.data?.data?.map((skill, index) => (
          <SkillUserComponent key={ index } skill={ skill } index={ index } />
        )) }
      </Box>
    </Box>
  );
};

export default SkillScreen;
