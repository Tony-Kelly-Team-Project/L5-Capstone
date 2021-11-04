import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import axios from "axios"
import Home from "./Home"
import SnapShot from "./SnapShot"
import Inventory from "./Inventory"
import InventoryForm from "./InventoryForm"
import Reports from "./Reports"
import NavBar from "./NavBar"
import "./index.css"


function App() {

  const [inventories, setInventories] = useState([])

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



  return (

    <div>

      <NavBar />

      <Switch>

        <Route exact path="/">
          <Home />
          <SnapShot />
        </Route>

        <Route path="/inventory">
          <Inventory />
          <InventoryForm />
        </Route>

        <Route path="/reports">
          {inventories.map((inventory, index) =>
            <Reports
              {...inventory}
              key={inventory._id}
              index={index}
            />
          )
          }
        </Route>

      </Switch>

    </div>
  );
}

export default App;