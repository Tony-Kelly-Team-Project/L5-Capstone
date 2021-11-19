// import React from "react"
import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "./SearchBar"
import DropDown from "./DropDown"
import "./Reports.css"

//NOTE:  maybe use Bootstrap to help construct the inventory table into card format

function Reports() {

    //useState
    const [inventories, setInventories] = useState([])
    const [searchTitleTerm, setSearchTitleTerm] = useState("")
    const [searchCategoryTerm, setSearchCategoryTerm] = useState("")


    //GET ALL
    const getInventories = () => {
        axios.get(`/inventories/list/sorted`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log("useEffect triggered")
        getInventories()
    }, [])

    //Titles SEARCH BAR
    //Q:  what should be starting point on Reports Page -- blank or all listings??
    const titleSearch = () => {
        console.log("searchTitleTerm:", searchTitleTerm)

        axios.get(`inventories/search/title?title=${searchTitleTerm}`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))

    }

    //Category SEARCH BAR
    const categorySearch = () => {
        console.log("searchCategoryTerm:", searchCategoryTerm)

        axios.get(`inventories/search/category?category=${searchCategoryTerm}`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))

    }

    //handleChange for Title Search Bar
    const handleChangeTitle = (e) => {
        console.log(e.target.value)
        setSearchTitleTerm(e.target.value)
    }

    //handleChange for Category Search Bar
    const handleChangeCategory = (e) => {
        console.log(e.target.value)
        setSearchCategoryTerm(e.target.value)
    }

    // filter for Category Dropdown Menu
    const handleFilter = (e) => {
        console.log(e.target.value)
        axios.get(`inventories/search/category?category=${e.target.value}`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err))
    }

    //filter for zero quantities
    //Question:  Add another dimension to this one to sort by _id as well???
    const handleZeroQty = () => {
        axios.get(`inventories/search/zeroquantity`)
            .then(res => setInventories(res.data))
            .catch(err => console.log(err)) 
    }

    //delete zero quantities
    const deleteZeroQty = () => {
        axios.delete(`inventories/delete/zero`)
            .then(res => alert(res.data))
            .catch(err => console.log(err))
            getInventories()
    }


    return (

        <div className="table-container">

            <div className="options-bar">
                <DropDown
                    handleFilter={handleFilter}
                />
                <SearchBar
                    handleChangeTitle={handleChangeTitle}
                    handleChangeCategory={handleChangeCategory}
                    titleSearch={titleSearch}
                    categorySearch={categorySearch}
                />
                <button className="all-inventory" onClick={getInventories}>Get All Inventory</button>
                <button className="zero-list" onClick={handleZeroQty}>Find all Zero Qty</button>
                <button className="zero-delete" onClick={deleteZeroQty}>Delete All Zero Qty</button>
            </div>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
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
                                <td>{inventory._id}</td>
                                <td>{inventory.title}</td>
                                <td>{inventory.condition}</td>
                                <td>{inventory.price}</td>
                                <td>{inventory.quantity}</td>
                                <td>{inventory.location}</td>
                                <td>{inventory.sku}</td>
                                <td>{inventory.category}</td>
                            </tr>
                            
                        )
                 })}
                        </tbody>
           

            </table>



        </div >
    );
}

export default Reports;

