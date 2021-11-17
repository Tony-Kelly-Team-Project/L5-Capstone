// import React, { useState, useEffect } from "react"
import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./Home"
import SnapShot from "./SnapShot"
import Inventory from "./Inventory"
import InventoryForm from "./InventoryForm"
import Reports from "./Reports"
import NavBar from "./NavBar"
import "./index.css"


function App() {

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
          <Reports />

        </Route>

      </Switch>

    </div>
  );
}

export default App;