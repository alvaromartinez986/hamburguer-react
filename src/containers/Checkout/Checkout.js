import React, { useState, useEffect } from 'react'
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index'

const Checkout = props => {
    let summary = <Redirect to="/" />


    if (props.ings) {
        const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (<div>
            {purchaseRedirect}
            <CheckoutSummary
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHandler(props.history)}
                checkoutContinue={checkoutContinueHandler(props.history)}
            />
            <Route path={props.match.path + '/contact-data'} component={ContactData} />
        </div>

        );
    }
    return (
        <div>
            {summary}
        </div>
    )


}

const checkoutCancelledHandler = (history) => () => {
    history.goBack();
}

const checkoutContinueHandler = (history) => () => {
    history.replace('/checkout/contact-data');
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
