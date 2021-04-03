import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updateState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true,
            }
            return updateObject(state, updateState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngrs = updateObject(state.ingredients, updatedIngr);
            const updateSt = {
                ingredients: updatedIngrs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true,
            }
            return updateObject(state, updateSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: initialState.totalPrice,
                building: false,
            }
            )
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
}

export default reducer; 