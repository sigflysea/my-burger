import React, { Component } from 'react';

import Auxi from '../Auxi/Auxi';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
        componentWillMount() {
            this.interceptorsReq = axios.interceptors.request.use(
                (req) => {
                    this.setState({ error: null });
                    return req;
                }
            );
            this.interceptorsRes = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({ error: error });
                }
            );
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(
                this.interceptorsReq
            );
            axios.interceptors.response.eject(
                this.interceptorsRes
            );
        }
        errorConfirmed = () => {
            this.setState({ error: null });
        };
        render() {
            return (
                <Auxi>
                    <Modal
                        show={this.state.error}
                        cancelOrder={this.errorConfirmed}
                    >
                        {this.state.error
                            ? this.state.error.message
                            : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxi>
            );
        }
    };
};

export default withErrorHandler;
