import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckourSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            cheese: 3,
        },
        totalPrice: 0,
    };
    componentWillMount() {
        const query = new URLSearchParams(
            this.props.location.search
        );
        const ing = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ing[param[0]] = +param[1];
                //unary operator + change text to integer
            }
        }

        this.setState({
            ingredients: ing,
            totalPrice: price,
        });
    }
    cancelOrder = () => {
        this.props.history.goBack();
    };
    proceedOrder = () => {
        this.props.history.replace(
            '/checkout/contact-data'
        );
    };
    render() {
        return (
            <div>
                <CheckourSummary
                    ingredients={this.state.ingredients}
                    cancelOrder={this.cancelOrder}
                    proceedOrder={this.proceedOrder}
                />
                <Route
                    path={
                        this.props.match.path +
                        '/contact-data'
                    }
                    render={(props) => (
                        <ContactData
                            ing={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
