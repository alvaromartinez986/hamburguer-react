import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { checkValidity } from '../../../shared/utility'

const ContactData = props => {
    const [orderedForm, setOrderedForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,

        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false,

        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            valid: true,
            validation: {}
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const formElementsArray = [];

    for (let key in orderedForm) {
        formElementsArray.push({
            id: key,
            config: orderedForm[key]
        });
    }



    let form = (<form onSubmit={orderHandler(props, orderedForm)}>
        {formElementsArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id, orderedForm, setOrderedForm, setFormIsValid)} />))}
        <Button btnType="Success" disabled={!formIsValid}>Order</Button>
    </form>);

    if (props.loading) {
        form = <Spinner />
    }



    return (
        <div className='ContactData'>
            <h4>Enter yor Contact Data</h4>
            {form}
        </div>
    )
}

const orderHandler = (props, formData) => (event) => {
    event.preventDefault();
    const dataOrder = {};
    for (let formElementIdentifier in formData) {
        dataOrder[formElementIdentifier] = formData[formElementIdentifier].value;
    }
    const order = {
        ingredients: props.ings,
        price: props.price,
        orderData: dataOrder,
        userId: props.userId
    }

    props.onOrderBurguer(order, props.token);
}


const inputChangedHandler = (event, inputIdentifier, orderedForm, setOrderedForm, setFormIsValid) => {
    const updatedOrderForm = {
        ...orderedForm
    };

    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setFormIsValid(formIsValid);
    setOrderedForm(updatedOrderForm);
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurguer: (orderData, token) => dispatch(actions.purchaseBurguer(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
