import React from 'react'
import Auxiliar from '../../../hoc/Auxiliar'
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
    });

    return (
        <Auxiliar>
            <h3>You Order</h3>
            <p>A delicious burguer with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxiliar>
    )
}


export default OrderSummary
