import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: true,
    };
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    render() {
        return (
            <Auxi>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}

export default Layout;
