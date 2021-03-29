import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const ITEMPRICE = {
    salad: 0.5,
    bacon: 0.75,
    cheese: 0.4,
    meat: 1.3,
};
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };
    componentDidMount() {
        axios
            .get('/ing.json')
            .then((response) => {
                this.setState({
                    ingredients: response.data,
                });
            })
            .catch((error) => {
                this.setState({ error: true });
            });
    }
    updatePurchasable(updatedIngre) {
        const purchase = { ...updatedIngre };
        const sum = Object.keys(purchase)
            .map((ingKey) => {
                return purchase[ingKey];
            })
            .reduce((accu, el) => {
                return accu + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }
    addIngredient = (type) => {
        const countUpdate =
            this.state.ingredients[type] + 1;
        const updatedIngre = { ...this.state.ingredients };
        updatedIngre[type] = countUpdate;

        const addPrice = ITEMPRICE[type];
        const updatePrice =
            this.state.totalPrice + addPrice;

        this.setState({
            totalPrice: updatePrice,
            ingredients: updatedIngre,
        });
        this.updatePurchasable(updatedIngre);
    };
    removeIngredient = (type) => {
        const countUpdate =
            this.state.ingredients[type] - 1;
        if (countUpdate < 0) return;
        const updatedIngre = { ...this.state.ingredients };
        updatedIngre[type] = countUpdate;

        const addPrice = ITEMPRICE[type];
        const updatePrice =
            this.state.totalPrice - addPrice;

        this.setState({
            totalPrice: updatePrice,
            ingredients: updatedIngre,
        });
        this.updatePurchasable(updatedIngre);
    };
    placeOrder = () => {
        this.setState({ purchasing: true });
    };
    cancelOrder = () => {
        this.setState({ purchasing: false });
    };
    proceedOrder = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Long',
                address: 'long island',
            },
        };
        console.log('how many' + this.state.loading);
        //  why this show false? shouldn't it show value from line 79??
        axios
            .post('/order.json', order)
            .then((response) => {
                this.setState({
                    loading: false,
                    purchasing: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    purchasing: false,
                });
            });
    };
    render() {
        const disableIng = { ...this.state.ingredients };
        for (let key in disableIng) {
            disableIng[key] = disableIng[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? (
            <p>Ingredients can't load</p>
        ) : (
            <Spinner />
        );
        if (this.state.ingredients) {
            burger = (
                <Auxi>
                    <Burger
                        ingredients={this.state.ingredients}
                    />
                    <BuildControls
                        add={this.addIngredient}
                        remove={this.removeIngredient}
                        disableIng={disableIng}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.placeOrder}
                    />
                </Auxi>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    cancelOrder={this.cancelOrder}
                    proceedOrder={this.proceedOrder}
                    price={this.state.totalPrice}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>;
        }
        return (
            <Auxi>
                <Modal
                    show={this.state.purchasing}
                    cancelOrder={this.cancelOrder}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxi>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
