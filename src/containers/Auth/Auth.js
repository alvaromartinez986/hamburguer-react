import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility'


const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });

    useEffect(() => {
        if (!props.buildingBurguer && props.authRedirect !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [])

    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignup, setIsSignUp] = useState(true);

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id, authForm, setAuthForm, setFormIsValid)} />
    ))

    if (props.loading) {
        form = <Spinner />
    }

    let errorMess = null;

    if (props.error) {
        errorMess = <p>{props.error}</p>
    }

    let authRedirect = props.isAutheticated ? <Redirect to={props.authRedirectPath} /> : null;


    return (
        <div>
            {errorMess}
            {authRedirect}
            <form className="Auth" onSubmit={submitHandler(props, authForm, isSignup)}>
                {form}
                <Button btnType="Success" > Submit </Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler(setIsSignUp)}> Switch to {isSignup ? 'Signin' : 'SignUp'} </Button>
        </div>
    )
}


const inputChangedHandler = (event, inputIdentifier, authForm, setAuthForm, setFormIsValid) => {
    const updatedAuthForm = {
        ...authForm
    };

    const updatedFormElement = {
        ...updatedAuthForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
    updatedAuthForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedAuthForm) {
        formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
    }

    setFormIsValid(formIsValid);
    setAuthForm(updatedAuthForm);
}


const submitHandler = (props, formData, isSignup) => (event) => {
    event.preventDefault();
    props.onAuth(formData.email.value, formData.password.value, isSignup);
}

const switchAuthModeHandler = (setIsSignUp) => () => {
    setIsSignUp(prevState => !prevState);
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAutheticated: state.auth.token !== null,
        buildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth); 
