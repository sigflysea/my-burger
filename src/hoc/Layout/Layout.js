import React, { Component } from 'react';
import Auxi from '../Auxi/Auxi';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };
    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false,
        });
    };
    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };
        });
    };

    render() {
        return (
            <Auxi>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <Toolbar toggle={this.sideDrawerToggle} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}

export default Layout;
