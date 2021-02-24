import React from 'react';
import Auxi from '../../../hoc/Auxi';
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
        </Auxi>
    );
};

export default orderSummary;
