import React, { memo, useEffect, useState } from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { COLORS } from '../../assets/colors';
import { TYPOGRAPHY_Style } from '../../assets/styles/typograpyStyle';

const CustomBreadcrub = () => {
  const location = useLocation();
  const [componentToShow, setComponentToShow] = useState('');

  const pathToTitle = {
    '/admin': 'Education',
    '/admin/skill': 'Skill',
    '/admin/project': 'Project',
    '/admin/profile': 'Profile',
  };

  useEffect(() => {
    setComponentToShow(pathToTitle[location.pathname] || 'Education');
  }, [location.pathname]);

  return (
    <Box role="presentation" py={ 1 } ml={ { xs: 2, sm: 2, md: 'unset' } }>
      <Breadcrumbs aria-label="breadcrumb" sx={ { color: COLORS.white } }>
        <Typography color={ COLORS.white } sx={ TYPOGRAPHY_Style().small }>
          Admin
        </Typography>
        <Typography color={ COLORS.white } sx={ TYPOGRAPHY_Style().extraSmall }>
          Portfolio
        </Typography>
        <Typography color={ COLORS.white } sx={ TYPOGRAPHY_Style().extraSmall }>
          { componentToShow }
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default memo(CustomBreadcrub);
