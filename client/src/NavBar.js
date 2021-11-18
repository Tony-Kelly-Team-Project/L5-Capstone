import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"



function NavBar() {
    return (
        <nav>
            <ul>
            <li><a><Link to="/">Home</Link></a></li>
            <li><a><Link to="/inventory">Inventory</Link></a></li>
            <li><a><Link to="/reports">Reports</Link></a></li>
            </ul>
        </nav>
    );
}

export default NavBar;