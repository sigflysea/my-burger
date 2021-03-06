import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    };
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ing,
            price: this.state.totalPrice,
            customer: {
                name: 'Long',
                address: 'long island',
            },
        };
        axios
            .post('/order.json', order)
            .then((response) => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                });
            });
    };
    render() {
        let form = (
            <form>
                <input
                    className={classes.Input}
                    type='text'
                    name='name'
                    placeholder='Your Name'
                />
                <input
                    className={classes.Input}
                    type='email'
                    name='email'
                    placeholder='Your Mail'
                />
                <input
                    className={classes.Input}
                    type='text'
                    name='street'
                    placeholder='Street'
                />
                <input
                    className={classes.Input}
                    type='text'
                    name='postal'
                    placeholder='Postal Code'
                />
                <Button
                    btnType='Success'
                    clicked={this.orderHandler}
                >
                    Order{' '}
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
