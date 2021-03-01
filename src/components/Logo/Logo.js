import React from 'react';
import classes from './Logo.module.css';
import image from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={image} alt='burger' />
    </div>
);

export default logo;
