import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            <BurgerIngredient type='meat' />
            <BurgerIngredient type='bread-tottom' />
        </div>
    );
};

export default burger;
