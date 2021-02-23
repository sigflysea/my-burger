import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    let tIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((acul, el) => {
            return acul.concat(el);
        }, []);

    if (tIngredients.length === 0) {
        tIngredients = <p>Please add ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {tIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;
