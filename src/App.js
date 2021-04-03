import './App.css';
import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

function App(props) {


  useEffect(() => {
    props.onTryAutoSignUp();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurguerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/orders" exact component={asyncOrders} />
        <Route path="/" exact component={BurguerBuilder} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout >
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
