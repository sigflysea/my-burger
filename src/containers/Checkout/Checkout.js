import React, { Component } from 'react';
import CheckourSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
    state = {
        ingredients: {
            cheese: 3,
        },
    };
    componentDidMount() {
        const query = new URLSearchParams(
            this.props.location.search
        );
        const ing = {};
        for (let param of query.entries()) {
            ing[param[0]] = +param[1];
            //not using + , different state ingredients loaded???
        }

        this.setState({ ingredients: ing });
    }
    render() {
        return (
            <div>
                <CheckourSummary
                    ingredients={this.state.ingredients}
                />
            </div>
        );
    }
}

export default Checkout;
