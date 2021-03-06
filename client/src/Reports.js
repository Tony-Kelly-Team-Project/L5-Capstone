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

    //format currency
       const currencyFormat = (num)=> {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  
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
                <div className="buttons-group">
                    <button className="all-inventory-btn" onClick={getInventories}>Get All Inventory</button>
                    <button className="zero-list-btn" onClick={handleZeroQty}>Find all Zero Qty</button>
                    <button className="zero-delete-btn" onClick={deleteZeroQty}>Delete All Zero Qty</button>
                </div>
            </div>

            <table>
                <colgroup>
                    <col span="1" className="inv-id"></col>
                </colgroup>

             
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Condition</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Location</th>
                    </tr>
                </thead>
                                 
                        <tbody>
                        {inventories.map((inventory, index) => {
                        return (
                            <tr id={inventory._id} key={inventory._id} index={index}>
                                <td className="inv-id">{inventory._id}</td>
                                <td>{inventory.category}</td>
                                <td>{inventory.title}</td>
                                <td>{inventory.condition}</td>
                                <td>{inventory.sku}</td>
                                <td className="inv-price-quant">{currencyFormat(inventory.price)}</td>
                                <td className="inv-price-quant">{inventory.quantity}</td>
                                <td>{inventory.location}</td>
                            </tr>
                            
                        )
                 })}
                        </tbody>
           

            </table>



        </div >
    );
}

export default Reports;

