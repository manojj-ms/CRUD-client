import React from "react";
import { Switch, Route, Link, Router } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import AddTodo from "./components/Add";
import List from "./components/List";
import Todo from "./components/Todo"



function App() {
  return (
    <div>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand ml-5" href="#">Todo</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link to={"/list"} class="nav-item nav-link active">
                All notes
              </Link>
              <Link to={"/add"} class="nav-item nav-link active">
                Add notes
              </Link>
            </div>

          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/add" component={AddTodo} />
            <Route exact path="/list" component={List} />
            <Route exact path="/todo/:id" component={Todo} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
