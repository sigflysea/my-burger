import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const ITEMPRICE = {
    salad: 0.5,
    bacon: 0.75,
    cheese: 0.4,
    meat: 1.3,
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };
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
        alert('Hey You');
    };
    render() {
        const disableIng = { ...this.state.ingredients };
        for (let key in disableIng) {
            disableIng[key] = disableIng[key] <= 0;
        }
        return (
            <Auxi>
                <Modal
                    show={this.state.purchasing}
                    cancelOrder={this.cancelOrder}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelOrder={this.cancelOrder}
                        proceedOrder={this.proceedOrder}
                    />
                </Modal>

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
    }
}

export default BurgerBuilder;
