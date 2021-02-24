import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const control = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Price: <strong>{props.price.toFixed(2)}</strong>
        </p>
        {control.map((contl) => (
            <BuildControl
                key={contl.label}
                label={contl.label}
                add={() => props.add(contl.type)}
                remove={() => props.remove(contl.type)}
                disableIn={props.disableIng[contl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchasing}
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;
