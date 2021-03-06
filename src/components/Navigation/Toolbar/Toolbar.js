import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/SiderToggle/DrawerToggle';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle toggle={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div className={classes.DesktopOnly}>
            <NavigationItems />
        </div>
    </header>
);
export default toolbar;
