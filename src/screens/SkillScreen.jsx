/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { getAllSkill } from '../api/skill';
import { useQuery } from '@tanstack/react-query';
import CustomThreeDecahedro from '../components/Threejs/CustomThreeDecahedro';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';




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
          gap: 3,
          alignItems: 'initial',
          justifyContent: 'center',
          pt: '9vh',
          pb: 8,
        } }
      >
        { data?.data?.data?.map((skill, index) => (
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
            <Typography sx={ { fontSize: 16, fontWeight: 'bold', color: "#fff", letterSpacing: .5, py: 1 } }>{ skill.name }</Typography>
            <Typography sx={ { fontSize: 14, color: "#fff", letterSpacing: .5 } }>{ skill.proficiency }</Typography>
          </Box>
        )) }
      </Box>
    </Box>
  );
};

export default SkillScreen;
