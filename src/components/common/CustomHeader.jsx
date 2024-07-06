import {
  Avatar, Box, Typography, Menu,
  MenuItem,
  Hidden,
  Tooltip,
  IconButton,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS } from '../../assets/colors'
import { ICONS } from '../../assets/icons'
import person from '../../assets/images/person.jpeg'
import { TYPOGRAPHY_Style } from '../../assets/styles/typograpyStyle'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import CustomLogo from './CustomLogo'
import { IMAGEURL } from '../../config'

const CustomHeader = () => {

  const userData = localStorage.getItem('user');
  // Parse JSON string back to JavaScript object
  const parsedUser = JSON.parse(userData);

  const styles = TYPOGRAPHY_Style();
  const navigate = useNavigate();


  const [anchorEl, setAnchorEl] = useState(null);
  const [header, setHeader] = useState("header");

  const handleIconButton = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };





  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {

      });
    } else {
      document.exitFullscreen().then(() => {

      });
    }
  };



  const NavigateToLogot = useCallback(() => {
    localStorage.clear();
    navigate('/login')
  }, [navigate])

  return (
    <Box sx={ { height: 56, backgroundColor: header > 50 ? COLORS.headerScroll : COLORS.primary, position: 'fixed', width: '100%', display: 'flex', alignItems: 'center', zIndex: 150 } }>
      <Box sx={ { px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' } }>
        <Box>

        </Box>
        { <Hidden mdDown>
          <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 } }>
            <Box onClick={ toggleFullScreen } sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
              <Tooltip title={ 'FullScreen' }>
                <ICONS.FullscreenIcon.component sx={ ICONS.FullscreenIcon.sx } /></Tooltip>
            </Box>
            <Tooltip title={ 'Profile & Logout' }>
              <Avatar src={ parsedUser?.profileImg } variant='circular' sx={ { width: 40, height: 40, cursor: 'pointer', boxShadow: 8 } } onClick={ handleIconButton } />  </Tooltip>
          </Box>
        </Hidden> }
      </Box>
      <Menu
        anchorEl={ anchorEl }
        open={ Boolean(anchorEl) }
        onClose={ handleCloseMenu }
        anchorOrigin={ {
          vertical: 'left',
          horizontal: 'left',
        } }
        transformOrigin={ {
          vertical: 'bottom',
          horizontal: 'left',
        } }
        getContentAnchorEl={ null }
        sx={ { borderRadius: 10, marginLeft: -1, marginTop: 5 } }
      >

        <MenuItem sx={ { background: COLORS.menuItemBox, fontSize: 16, fontFamily: 'Outfit-Medium', letterSpacing: 0.79 } } >
          { 'Profile' }
        </MenuItem>
        <MenuItem sx={ { color: COLORS?.secondary, fontSize: 16, fontFamily: 'Outfit-Medium', letterSpacing: 0.79 } } onClick={ NavigateToLogot }>
          { 'Logout' }
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default CustomHeader
