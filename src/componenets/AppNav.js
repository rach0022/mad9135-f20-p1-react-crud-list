import React from 'react'
import { NavLink } from 'react-router-dom'

// AppNav will show the app logo and the add button
// made using materialize-css 
function AppNav() {
    return (
        <nav className="AppNav">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo"><i className="material-icons">nature</i>Creature Catalog</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#"><i className="material-icons left">add</i>Add</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default AppNav
