import React from "react"
import "./DropDown.css"


function DropDown(props) {
    return (
        <div>
            <div className="dropdown-menu">
                <h5>Inventory By Category</h5>

                <select onChange={props.handleFilter} className="dropdown">
                    <option>--Select a Category--</option>
                    <option value="apparel">Apparel</option>
                    <option value="clothing">Clothing</option>
                    <option value="toys">Toys</option>
                </select>
            </div>
        </div>
    )
}


export default DropDown;

