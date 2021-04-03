import React from 'react';
import { connect } from 'react-redux'
import Auxiliar from '../../hoc/Auxiliar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import "./Layout.css";

const Layout = (props) => (
    <Auxiliar>
        <Toolbar isAuth={props.isAuthenticated} />
        <SideDrawer />
        <main className="Content">
            {props.children}
        </main>
    </Auxiliar>

);


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout); 