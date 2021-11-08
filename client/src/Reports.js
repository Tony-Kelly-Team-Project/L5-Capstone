// import React from "react"
import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "./SearchBar"
import DropDown from "./DropDown"
import "./Reports.css"

//NOTE:  maybe use Bootstrap to help construct the inventory table??
//FORMATTING:  look at "react-table" library to help construct format; look at Material UI for tables
//Look at Data Tables in mongoDB also

function Reports() {

    //useState
    const [inventories, setInventories] = useState([])
    const [searchTitleTerm, setSearchTitleTerm] = useState("")
    // const [searchCategoryTerm, setSearchCategoryTerm] = useState("")


    //GET ALL
    const getInventories = () => {
        axios.get(`/inventories`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))
    }

    //useEffect
    useEffect(() => {
        console.log("useEffect triggered")
        getInventories()
    }, [])

    //Titles SEARCH BAR
    //NOTE:  console.log has correct search result & displays results; NOW -- need to figure out how to reset if not searching (if that's what want)
    //Q:  what should be starting point on Reports Page -- blank or all listings??

    const titleSearch = () => {
        console.log("searchTitleTerm:", searchTitleTerm)

        axios.get(`inventories/search/title?title=${searchTitleTerm}`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))

    }

    // const categorySearch = () => {
    //     console.log("searchCategoryTerm:", searchCategoryTerm)

    //     axios.get(`inventories/search/category?category=${searchCategoryTerm}`)
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))

    // }

    //handleChange for Title Search Bar
    const handleChangeTitle = (e) => {
        console.log(e.target.value)
        setSearchTitleTerm(e.target.value)
    }

    //handleChange for Category Search Bar
    // const handleChangeCategory = (e) => {
    //     console.log(e.target.value)
    //     setSearchCategoryTerm(e.target.value)
    // }

    // filter for Category Dropdown Menu
    const handleFilter = (e) => {
        console.log(e.target.value)
        axios.get(`inventories/search/category?category=${e.target.value}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    //filter for zero quantities
    //Question:  Add another dimension to this one to sort by _id as well???
    const handleZeroQty = () => {
        axios.get(`inventories/search/zeroquantity`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))
    }

    //filter for zero quantities
    //NOTE: CREATE ALERT/WARNING FOR THIS ONE

    const deleteZeroQty = () => {
        axios.delete(`inventories/delete/zero`)
            .then(res => console.log("deleteZero:", res))
            .catch(err => console.log(err))
    }


    //NEED TO CONNECT SEARCH BAR BELOW TO MONGODB ROUTE FOR THIS

    return (

        <div className="table-container">

            <div className="options-bar">
                <DropDown
                    handleFilter={handleFilter}
                />
                <SearchBar
                    handleChangeTitle={handleChangeTitle}
                    // handleChangeCategory={handleChangeCategory}
                    titleSearch={titleSearch}
                // categorySearch={categorySearch}
                />

                <button className="zero-list" onClick={handleZeroQty}>Sort List by Zero Qty</button>
                <button className="zero-delete" onClick={deleteZeroQty}>Delete All Zero Qty</button>
            </div>

            <table>

                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Condition</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>SKU</th>
                        <th>Category</th>
                    </tr>
                </thead>

                <tbody>

                    {inventories.map((inventory, index) => {
                        return (
                            <tr id={inventory._id} key={inventory._id} index={index}>
                                <td>{inventory.title}</td>
                                <td>{inventory.condition}</td>
                                <td>{inventory.price}</td>
                                <td>{inventory.quantity}</td>
                                <td>{inventory.location}</td>
                                <td>{inventory.SKU}</td>
                                <td>{inventory.category}</td>
                            </tr>
                        )
                    }
                    )}

                </tbody>

            </table>



        </div >
    );
}

export default Reports;

