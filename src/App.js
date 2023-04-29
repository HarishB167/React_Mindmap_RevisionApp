import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryChooser from "./pages/CategoryChooser";
import MindmapTaskForm from "./pages/MindmapTaskForm";
import TaskView from "./pages/TaskView";
import MindmapForm from "./pages/MindmapForm";
import ImageViewer from "./pages/ImageViewer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Route path="/category-create" component={CategoryCreate} />
        <Route path="/category-choose" component={CategoryChooser} />
        <Route path="/create-task" component={MindmapTaskForm} />
        <Route path="/task-new" component={MindmapTaskForm} />
        <Route path="/task-view" component={TaskView} />
        <Route path="/mindmap-view/:id" component={MindmapForm} />
        <Route path="/image-view" component={ImageViewer} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
