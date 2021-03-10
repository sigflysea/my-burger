import React from 'react';
import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSum = Object.keys(
        props.ingredients
    ).map((igKey) => {
        return (
            <li key={igKey}>
                <span
                    style={{ textTransform: 'capitalize' }}
                >
                    {igKey}
                </span>
                : {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Auxi>
            <p>Your order: </p>
            <ul>{ingredientSum}</ul>
            <p>
                <strong>
                    Your total is: ${props.price}
                </strong>
            </p>
            <Button
                btnType='Danger'
                clicked={props.cancelOrder}
            >
                Cancel
            </Button>
            <Button
                btnType='Success'
                clicked={props.proceedOrder}
            >
                Place Order
            </Button>
        </Auxi>
    );
};

export default orderSummary;
