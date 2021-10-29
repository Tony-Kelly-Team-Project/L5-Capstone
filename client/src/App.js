import React from "react"
import { Link, Switch, Route } from "react-router-dom"



function App() {
  return (

    <div>
      <Link to="/">Home</Link>
      <Link to="/inventory">Inventory</Link>
      <Link to="/reports">Reports</Link>

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/inventory">
          <Inventory />
        </Route>

        <Route exact path="/reports">
          <Reports />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
