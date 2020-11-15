import React from 'react'
import { NavLink } from 'react-router-dom'
import brandImg from '../static/images/brand-logo.svg'

// AppNav will show the app logo and the add button
// made using materialize-css 
function AppNav() {
    return (
        <nav className="AppNav dark-shade">
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo"><img src={brandImg} alt="The Logo for Nature Log" /></NavLink>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to="add"><i className="material-icons left">add</i>Add</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default AppNav
