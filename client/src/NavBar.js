import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"



function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/reports">Reports</Link>
        </nav>
    );
}

export default NavBar;