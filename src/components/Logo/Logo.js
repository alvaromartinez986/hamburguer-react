import React from 'react'
import burguerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'

const Logo = props => (
    <div className='Logo'>
        <img src={burguerLogo} alt="My Burguer" />
    </div>
)

export default Logo
