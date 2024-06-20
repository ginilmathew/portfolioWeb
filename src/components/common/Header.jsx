/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation()
  const [hovered, setHovered] = useState(null);

  const linkStyle = {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    letterSpacing: 1,
    fontWeight: "bold"
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <Box
      component="header"
      sx={ {

        height: '6vh',
        background: '#000',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1,
        color: '#fff',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        px: 5,

        top: 0,
        left: 0,
        boxShadow: 3,
      } }
    >
      <Link
        href="home"
        style={ {
          ...linkStyle,
          color: hovered === 0 ? '#f50057' : '#fff',
        } }
        onMouseEnter={ () => handleMouseEnter(0) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Home</Typography>
      </Link>
      <Link
        to={ 'skill' }
        style={ {
          ...linkStyle,
          color: hovered === 1 ? '#f50057' : '#fff',
        } }
        onMouseEnter={ () => handleMouseEnter(1) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Skills</Typography>
      </Link>
      <Link
        to={ 'education' }
        style={ {
          ...linkStyle,
          color: hovered === 2 ? '#f50057' : '#fff',
        } }
        onMouseEnter={ () => handleMouseEnter(2) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Education</Typography>
      </Link>
      <Link
        to={ "project" }
        style={ {
          ...linkStyle,
          color: hovered === 3 ? '#f50057' : '#fff',
        } }
        onMouseEnter={ () => handleMouseEnter(3) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Projects</Typography>
      </Link>
      <a
        href="#"
        style={ {
          ...linkStyle,
          color: hovered === 4 ? '#f50057' : '#fff',
        } }
        onMouseEnter={ () => handleMouseEnter(4) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Contact Me</Typography>
      </a>
    </Box>
  );
};

export default Header;
