import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = props => (
    <ul className='NavigationItems'>
        <NavigationItem link="/" exact>Burguer Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated ?
            <NavigationItem link="/auth">Authenticate</NavigationItem> :
            <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
)


export default NavigationItems
