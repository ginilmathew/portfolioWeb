import React, { useState } from 'react';
import { COLORS } from '../../assets/colors';
import { Avatar, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import person from '../../assets/images/person.jpeg';
import { SideBarMenu } from '../../menus';
import { useLocation, useNavigate } from 'react-router-dom';
import { TYPOGRAPHY_Style } from '../../assets/styles/typograpyStyle';
import { IMAGEURL } from '../../config';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(0);


    const userData = localStorage.getItem('user');
    // Parse JSON string back to JavaScript object
    const parsedUser = JSON.parse(userData);


    const handleClick = (index) => {
        setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const Navigation = (path) => {
        navigate(path);
    };

    const style = TYPOGRAPHY_Style();
    const typographyStyles = TYPOGRAPHY_Style('Outfit-Medium');

    return (
        <Box sx={ { position: 'fixed', width: '17.5vw' } }>
            <Box sx={ { height: 120, background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
                <Box sx={ { display: 'flex', gap: 1, alignItems: 'center' } }>
                    <Avatar src={ IMAGEURL + parsedUser?.profileImg } variant='circular' sx={ { width: 90, height: 90, boxShadow: 8 } } />
                    <Box>
                        <Typography sx={ [style.medium, { color: '#fff' }] }>{ parsedUser?.username }</Typography>
                    </Box>
                </Box>
            </Box>
            <List component="nav" sx={ {
                paddingRight: 2,
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                height: `calc(100vh - 200px)`,
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#0000d',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#0000',
                }
            } }>
                { SideBarMenu?.map((menuItem, index) => (
                    <React.Fragment key={ index }>
                        <ListItem
                            button
                            onClick={ () => {
                                handleClick(index);
                                Navigation(menuItem?.path);
                            } }
                            sx={ {
                                my: 1.2,
                                borderStartStartRadius: 16,
                                borderEndStartRadius: 16,
                                height: 45,
                                transition: 'background-color 0.3s, box-shadow 0.3s, color 0.3s',
                                '&:hover': {
                                    backgroundColor: COLORS.sidebarHover,
                                    cursor: 'pointer'
                                },
                                ...(selectedIndex === index && {
                                    backgroundColor: COLORS.primary,
                                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                                    color: COLORS.white
                                }),
                            } }>
                            <ListItemIcon>
                                <menuItem.icon sx={ {
                                    ...(selectedIndex === index && {
                                        color: COLORS.white
                                    })
                                } } />
                            </ListItemIcon>
                            <ListItemText primary={ menuItem.text } sx={ typographyStyles.extraSmall } />
                            { menuItem.subMenuItems?.length > 0 && (selectedIndex === index ? <ExpandLess /> : <ExpandMore />) }
                        </ListItem>
                    </React.Fragment>
                )) }
            </List>
        </Box>
    );
}

export default Sidebar;
