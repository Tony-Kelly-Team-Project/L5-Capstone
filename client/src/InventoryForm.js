
import React, { useState } from "react"


export default function InventoryForm(props) {
    const initInputs = {
        title: props.title || "",
        condition: props.condition || "",
        price: props.price || "",
        quantity: props.quantity || "",
        location: props.location || "",
        sku: props.sku || "",
        category: props.category || ""
    }

    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const { name, value } = e.target
        setInputs (prevInputs => ({ ...prevInputs, [name]: value }))
    }

    function handleSubmit(e){
        e.preventDefault()
        props.submit(inputs, props._id)
        setInputs(initInputs)
        // console.log (inputs)
        if(props.setEditToggle) {
            props.setEditToggle(false)
        }
    }

    return (
        <form onSubmit={ handleSubmit } >
            <input
                type="text"
                name="title"
                value={ inputs.title }
                onChange={ handleChange }
                placeholder="TItle"/>
            <select
                type="text"
                name="condition"
                onChange={ handleChange }
                placeholder="Condition">
                <option value="reset">---All Conditions---</option>
                <option value="New with Tags">New w/Tags</option>
                <option value="New without Tags">New w/o Tags</option>
                <option value="New with Defects">New w/Defects</option>
                <option value="Pre-Owned">Pre-Owned</option>
            </select>
            <input
                type="text"
                name="price"
                value={ inputs.price }
                onChange={ handleChange }
                placeholder="Price $"/>
            <input
                type="number"
                name="quantity"
                value={ inputs.quantity }
                onChange={ handleChange }
                placeholder="Quantity"/>
            <select
                type="text"
                name="location"
                // value={ inputs.location }
                onChange={ handleChange }
                placeholder="Location">
                <option value="reset">---Locations---</option>
                <option value="Garage">Garage</option>
                <option value="Wharehouse">Wharehouse</option>
                </select>
            <input
                type="text"
                name="sku"
                value={ inputs.sku }
                onChange={ handleChange }
                placeholder="SKU"/>
            <select
                type="text"
                name="category"
                onChange={ handleChange }
                placeholder="Category">
                <option value="reset">---All Categories---</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Crafts">Crafts</option>
                <option value="Antiques">Antiques</option>
            </select>
            <button>{ props.btnText } </button>
        </form>
    );
}

// export default InventoryForm;
