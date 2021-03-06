import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './Toolbar.css'

const Toolbar = props => (
    <header className="Toolbar">
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
)


export default Toolbar


