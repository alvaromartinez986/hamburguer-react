import React, { useState, useEffect } from 'react';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Burguer from '../../components/Burguer/Burguer';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliar from "../../hoc/Auxiliar";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders'

export const BurguerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [])

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (props.ings) {
        burger = (
            <Auxiliar>    <Burguer ingredients={props.ings} />
                <BuildControls ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disableInfoBuilder(props.ings)}
                    price={props.price}
                    purchasable={updatePurchase(props.ings)}
                    isAuth={props.isAuthenticated}
                    ordered={purchaseHandler(setPurchasing, props)} /></Auxiliar>
        );

        orderSummary = <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler(setPurchasing)}
            purchaseContinued={purchaseContinueHandler(props)} />
    }

    return (
        <Auxiliar>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler(setPurchasing)}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliar>
    )

}

const purchaseHandler = (setPurchasing, props) => () => {

    if (props.isAuthenticated) {
        setPurchasing(true);
    } else {
        props.onSethRedirectPath('/checkout');
        props.history.push('/auth');
    }
}

const updatePurchase = (ingredients) => {
    const sumIngre = Object.keys(ingredients).map(key => {
        return ingredients[key];
    }).reduce((sum, el) => {
        return sum + el;
    }, 0);

    return sumIngre > 0;
}


const disableInfoBuilder = (ingredients) => {
    const disableInfo = {
        ...ingredients
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    return disableInfo;
}

const purchaseCancelHandler = (setPurchasing) => () => {
    setPurchasing(false);
}

const purchaseContinueHandler = (props) => () => {
    if (props.isAuthenticated) {
        props.onInitPurchased();
        props.history.push('/checkout');
    } else {
        props.history.push('/auth');
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSethRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
