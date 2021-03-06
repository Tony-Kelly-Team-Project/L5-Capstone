
import React, { useState, useEffect } from "react"
// import React from "react"    // change after merge - had to comment this line and uncomment line above
import { Switch, Route } from "react-router-dom"
import Home from "./Home"
import SnapShot from "./SnapShot"
import Inventory from "./Inventory.js"
import InventoryForm from "./InventoryForm.js"
import Reports from "./Reports"
import NavBar from "./NavBar"
import "./index.css"
import axios from 'axios' //change after merge I had pull in axios

export default function App(props) {

  const [inventories, setInventories] = useState([])
  
  // created a function to do a "Get" request for inventory items on our server
  function getInventories () {
    axios.get("/inventories")
      .then(res => setInventories(res.data))  // setInventories to be response data which update inventories array
      .catch(err => console.log(err)) // catch errors
  }

  //function to add item to database from for
  //function fires when submit - its expects a new inventory as a parameter
  function addInventory(newInventory){
    axios.post("/inventories", newInventory) // send the new inventory
    .then(res => {
      setInventories(prevInventories => [...prevInventories, res.data])
      if (res.data.quantity <= 5) {  //checks if quantity is less than or equal to 5
        alert(`You have less than 5 of ${res.data.title}  left in your inventory`) // sends an alert 
      }
    })
    .catch(err => console.log(err))
  }
  // function that allows you to edit and item in the inventory
  function editInventory(updates, inventoryId){
    axios.put(`/inventories/${inventoryId}`, updates)
      .then(res => {
        setInventories(prevInventories => prevInventories.map(inventory => inventory._id !==inventoryId ? inventory : res.data))
        if (res.data.quantity <= 5) {  //checks if quantity is less than or equal to 5
          alert(`You have less than 5 of ${res.data.title}  left in your inventory`) // sends an alert 
        }
      })
      .catch(err => console.log(err))
  }
  // function that allows you to delete individual items 
  function deleteInventory(inventoryId){
    axios.delete(`/inventories/${inventoryId}`)
    .then(res => {
      setInventories(prevInventories => prevInventories.filter(inventory => inventory._id !== inventoryId))
      
    })
    .catch(err => console.log(err))
  }

  //useEffect
  useEffect(() => {
    console.log("useEffect triggered")
    getInventories ()
  }, [])
  
  return (

    <div >

      <NavBar />
      
      <Switch >
        <Route exact path="/">
          <Home />
          <SnapShot />
        </Route>

        <Route path="/inventory">
        <InventoryForm
            submit={ addInventory }
            btnText="Add Ebay item"
            />
            <div className="app-container">
          <table>
            <thead>
              <h5>eBay Inventory</h5>
              <tr>
                <th>Title</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>SKU</th>
                <th>Categories</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
          </div>


          {inventories.map((inventory, index) =>
              <Inventory
                {...inventory}
                key={inventory._id}
                index={index}
                editInventory={ editInventory }
                deleteInventory = { deleteInventory }

              />
            )
            }
        </Route>

        <Route path="/reports">
              
          <Reports />

        </Route>
        
      </Switch>

    </div>
  );
}

