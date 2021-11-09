import './App.css';
import React from "react";
import {Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Main/>
        </Route>
        <Route path="/movies">
          <Movies/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
