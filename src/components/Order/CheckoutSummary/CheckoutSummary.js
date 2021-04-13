import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Place your order</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger
                    ingredients={props.ingredients}
                ></Burger>
            </div>
            <Button
                btnType='Danger'
                clicked={props.cancelOrder}
            >
                CANCEL
            </Button>
            <Button
                btnType='Success'
                clicked={props.proceedOrder}
            >
                SUBMIT
            </Button>
        </div>
    );
};

export default checkoutSummary;
