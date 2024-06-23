import React, { useState } from 'react';
import { Box, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMediumScreen = useMediaQuery('(max-width:960px)'); // Adjust max-width as needed

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    transition: 'color 0.3s ease',
    letterSpacing: 1,
    fontWeight: 'bold'
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Determine which link is active based on the current location pathname
  const isActive = (pathname) => {
    return location.pathname === pathname;
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
        overflowX: 'hidden', // Prevent horizontal scroll
      } }
    >
      {/* Hamburger menu icon */ }
      { isMediumScreen && (
        <IconButton
          sx={ { color: '#fff', display: 'block', ml: -3 } }
          onClick={ toggleMenu }
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
      ) }

      {/* Links for large screens */ }
      { !isMediumScreen && (
        <>
          <Link
            to="/home"
            style={ {
              ...linkStyle,
              color: isActive('/home') || hovered === 0 ? '#f50057' : '#fff',
              marginRight: 20, // Add margin between links
            } }
            onMouseEnter={ () => handleMouseEnter(0) }
            onMouseLeave={ handleMouseLeave }
          >
            <Typography variant="h7">Home</Typography>
          </Link>
          <Link
            to="/home/education"
            style={ {
              ...linkStyle,
              color: isActive('/home/education') || hovered === 2 ? '#f50057' : '#fff',
              marginRight: 20, // Add margin between links
            } }
            onMouseEnter={ () => handleMouseEnter(2) }
            onMouseLeave={ handleMouseLeave }
          >
            <Typography variant="h7">Education</Typography>
          </Link>
          <Link
            to="/home/skill"
            style={ {
              ...linkStyle,
              color: isActive('/home/skill') || hovered === 1 ? '#f50057' : '#fff',
              marginRight: 20, // Add margin between links
            } }
            onMouseEnter={ () => handleMouseEnter(1) }
            onMouseLeave={ handleMouseLeave }
          >
            <Typography variant="h7">Skills</Typography>
          </Link>
          <Link
            to="/home/project"
            style={ {
              ...linkStyle,
              color: isActive('/home/project') || hovered === 3 ? '#f50057' : '#fff',
              marginRight: 20, // Add margin between links
            } }
            onMouseEnter={ () => handleMouseEnter(3) }
            onMouseLeave={ handleMouseLeave }
          >
            <Typography variant="h7">Projects</Typography>
          </Link>
          <Link
            to="/home/aichat"
            style={ {
              ...linkStyle,
              color: isActive('/home/aichat') || hovered === 4 ? '#f50057' : '#fff',
            } }
            onMouseEnter={ () => handleMouseEnter(4) }
            onMouseLeave={ handleMouseLeave }
          >
            <Typography variant="h7">AI</Typography>
          </Link>
        </>
      ) }

      {/* Drawer for small screens */ }
      <Drawer
        anchor="left"
        open={ menuOpen }
        onClose={ () => setMenuOpen(false) }
        sx={ {
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            background: '#000',
            width: 250, // Adjust width as needed
          },
        } }
      >
        {/* Close button */ }
        <Box sx={ { display: 'flex', justifyContent: 'flex-end', pr: 1 } }>
          <IconButton
            onClick={ () => setMenuOpen(false) }
            aria-label="Close"
            sx={ { color: '#fff' } }
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* List of links */ }
        <List sx={ { width: 250 } }>
          <ListItem button component={ Link } to="/home" sx={ linkStyle }>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={ Link } to="/home/education" sx={ linkStyle }>
            <ListItemText primary="Education" />
          </ListItem>
          <ListItem button component={ Link } to="/home/skill" sx={ linkStyle }>
            <ListItemText primary="Skills" />
          </ListItem>
          <ListItem button component={ Link } to="/home/project" sx={ linkStyle }>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button component={ Link } to="/home/aichat" sx={ linkStyle }>
            <ListItemText primary="AI" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
