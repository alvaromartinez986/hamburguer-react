import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'

const SideDrawer = props => {
    return (
        <div className='SideDrawer'>
            <Logo />
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
    )
}



export default SideDrawer
