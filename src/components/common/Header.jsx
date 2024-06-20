/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  // Use a ref to store the active link instead of recalculating on every render
  const activeLinkRef = React.useRef(null);

  useEffect(() => {
    // Update the active link ref when the location changes
    activeLinkRef.current = location.pathname;
  }, [location]);

  const linkStyle = {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    letterSpacing: 1,
    fontWeight: 'bold',
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  // Use a single function to determine the link color
  const getLinkColor = (pathname, index) => {
    return activeLinkRef.current === pathname || hovered === index ? '#f50057' : '#fff';
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
          color: getLinkColor('/home', 0),
        } }
        onMouseEnter={ () => handleMouseEnter(0) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Home</Typography>
      </Link>
      <Link
        to="skill"
        style={ {
          ...linkStyle,
          color: getLinkColor('/home/skill', 1),
        } }
        onMouseEnter={ () => handleMouseEnter(1) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Skills</Typography>
      </Link>
      <Link
        to="education"
        style={ {
          ...linkStyle,
          color: getLinkColor('/home/education', 2),
        } }
        onMouseEnter={ () => handleMouseEnter(2) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Education</Typography>
      </Link>
      <Link
        to="project"
        style={ {
          ...linkStyle,
          color: getLinkColor('/home/project', 3),
        } }
        onMouseEnter={ () => handleMouseEnter(3) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Projects</Typography>
      </Link>
      <Link
        to="aichat"
        style={ {
          ...linkStyle,
          color: getLinkColor('/home/aichat', 4),
        } }
        onMouseEnter={ () => handleMouseEnter(4) }
        onMouseLeave={ handleMouseLeave }
      >
        <Typography variant="h7">Ai</Typography>
      </Link>
    </Box>
  );
};

export default Header;
