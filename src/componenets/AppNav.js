import React from 'react'
import { NavLink } from 'react-router-dom'

// AppNav will show the app logo and the add button
// made using materialize-css 
function AppNav() {
    return (
        <nav className="AppNav green">
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo"><i className="material-icons">nature</i>Creature Catalog</NavLink>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to="add"><i className="material-icons left">add</i>Add</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default AppNav
