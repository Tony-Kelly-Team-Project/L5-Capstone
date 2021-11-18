import React from "react"
import "./DropDown.css"


//Need to change this to dynamic dropdown based on data.

function DropDown(props) {
    return (
        <div>
            <div className="dropdown-menu">
                <h5>Inventory By Category</h5>

                <select onChange={props.handleFilter} className="dropdown">
                    <option>--Select a Category--</option>
                    <option value="antiques">Antiques</option>
                    <option value="books">Books</option>
                    <option value="clothing">Clothing</option>
                    <option value="computers">Computers</option>
                    <option value="crafts">Crafts</option>

                </select>
            </div>
        </div>
    )
}


export default DropDown;

