import React, { useState } from "react"
import InventoryForm from './InventoryForm.js'
import "./Inventory.css"

function Inventory(props) {

    const { title, condition, price, quantity, location, sku, category, _id } = props
    const [editToggle, setEditToggle] = useState(false)

    return (
        // allows you to toggle
        <div >
            { !editToggle ? 
                <>
                    <div >
                    <table>
                    <tbody>
                        <td>{title}</td>
                        <td> {condition}</td>
                        <td>{price}</td>
                        <td>{quantity}</td>
                        <td>{location}</td>
                        <td>{sku}</td>
                        <td>{category}</td>
                        <td>
                            <button
                                classname = "inventoryButton"
                                onClick={() => props.deleteInventory(_id)}>
                                Delete
                            </button>
                            <button
                                classname = "inventoryButton"
                                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                                Edit
                            </button>
                        </td>
                    </tbody>
                    </table>
                    </div>
                </>
            : 
                <>
                <InventoryForm
                    title = { title }
                    condition = { condition}
                    price = { price }
                    quantity = { quantity }
                    location = { location }
                    sku = { sku }
                    category = { category }
                    _id = { _id }
                    btnText="Submit Edit"
                    setEditToggle={ setEditToggle }
                    submit={ props.editInventory }
                />
                    <button
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                        Close </button>
                </>
            }
        </div>
    );
}

export default Inventory;




