import React from "react"


//NOTE:  maybe use Bootstrap to help construct the inventory table??
//FORMATTING:  look at "react-table" library to help construct format

function Reports(props) {

    const { title, condition, price, quantity, location, SKU, category } = props

    return (

        <div>

            <p>  Hey, I'm the Reports page; list all the stuff here!</p>
            <div>{title}</div>
            <div>{condition}</div>
            <div>{price}</div>
            <div>{quantity}</div>
            <div>{location}</div>
            <div>{SKU}</div>
            <div>{category}</div>
        </div>
    );
}

export default Reports;

