import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryChooser from "./pages/CategoryChooser";
import TaskForm from "./pages/TaskForm";
import TaskView from "./pages/TaskView";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/category-create" component={CategoryCreate} />
        <Route path="/category-choose" component={CategoryChooser} />
        <Route path="/task-new" component={TaskForm} />
        <Route path="/task-view" component={TaskView} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
