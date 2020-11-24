import React, { useState } from "react";
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import MyProfile from '@material-ui/icons/AccountCircleSharp';
import Logout from '@material-ui/icons/ExitToAppSharp';
import Login from '@material-ui/icons/LockOpenSharp';

import Budget from '@material-ui/icons/AccountBalanceWalletSharp';
import Person  from '@material-ui/icons/EmojiPeopleSharp';
import Report  from '@material-ui/icons/AssessmentSharp';
import PLDash  from '@material-ui/icons/EqualizerSharp';

import PLTable from '@material-ui/icons/GridOnSharp';
import PivotIcon from '@material-ui/icons/BusinessSharp';

import { Link } from 'react-router-dom'

import Logo from '../../images/logo.png';
import LogoMenu from '../../images/logo-sidebar.png';

import Chip from '@material-ui/core/Chip';

import { useSelector } from 'react-redux'


// const StyledMenu = withStyles({
//     paper: {
//       border: '1px solid #d3d4d5',
//     },
//   })((props) => (
//     <Menu
//       elevation={0}
//       getContentAnchorEl={null}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'center',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'center',
//       }}
//       {...props}
//     />
//   ));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [open, setOpen] = useState(false);


    const { auth } = useSelector(state => state)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const handleDrawerOpen = () => {
        setOpenSideBar(true);
    }

    const handleClick = () => {
        setOpen(!open);
    }

    const handleDrawerClose = () => {
        setOpenSideBar(false);
    }


    const handleClickAway = (e) => {
        if (e.clientX > 59 && e.clientY > 54)
            setOpenSideBar(false);
    }



    return (
        <div className={classes.root}>

            <AppBar position="static" style={{ height: '57px', backgroundColor: '#b11f2a' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, openSideBar && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} style={{ textAlign: 'center' }}>
                        <img src={Logo} alt="logo"></img>
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {auth.token ? (<div>
                                <StyledMenuItem onClick={handleClose} component={Link} to="/mypofile">
                                    <ListItemIcon>
                                        <MyProfile fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profilim" />
                                </StyledMenuItem>
                                <StyledMenuItem onClick={handleClose} component={Link} to="/login">
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Çıkış" />
                                </StyledMenuItem>
                            </div>

                            ) : (
                                    <StyledMenuItem onClick={handleClose} component={Link} to="/login">
                                        <ListItemIcon>
                                            <Login fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Giriş" />
                                    </StyledMenuItem>
                                )}


                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <ClickAwayListener onClickAway={(e) => handleClickAway(e)}>
                <Drawer
                    variant='persistent'
                    anchor="left"
                    open={openSideBar} >

                    <div className='header'>
                        <IconButton onClick={handleDrawerClose}>
                            <img src={LogoMenu} alt="logo"></img> <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />

                    {/* <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem> */}
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <Report />
                        </ListItemIcon>
                        <ListItemText primary="Rapor" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit style={{ paddingLeft: 15 }}>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} component={Link} to="/pldash" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <PLDash />
                                </ListItemIcon>
                                <ListItemText primary="P&L Genel" />
                                <Chip
                                    label="test"
                                    color="secondary"
                                />
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to='/pltable' onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <PLTable />
                                </ListItemIcon>
                                <ListItemText primary="P&L Tablo" />
                                <Chip
                                    label="tam"
                                    color="primary"
                                />
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to='/pivotreport' onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <PivotIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pivot Rapor" />
                                <Chip
                                    label="test"
                                    color="secondary"
                                />
                            </ListItem>
                        </List>
                        <Divider />
                    </Collapse>
                    <ListItem button className={classes.nested} component={Link} to='/mainList' onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Cari" />
                        <Chip
                            label="test"
                            color="secondary"
                        />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to='/budgetList' onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <Budget />
                        </ListItemIcon>
                        <ListItemText primary="Bütçe" />
                        <Chip
                            label="test"
                            color="secondary"
                        />
                    </ListItem>
                </Drawer>
            </ClickAwayListener>


        </div>
    );
}




export default NavBar;
