import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryChooser from "./pages/CategoryChooser";
import MindmapNewForm from "./pages/MindmapNewForm";
import TaskViewEditForm from "./pages/TaskViewEditForm";
import MindmapViewEditForm from "./pages/MindmapViewEditForm";
import MindmapImageViewer from "./pages/MindmapImageViewer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main className="main">
        <Switch>
          <Route path="/category-create" component={CategoryCreate} />
          <Route path="/category-choose" component={CategoryChooser} />
          <Route path="/create-task" component={MindmapNewForm} />
          <Route path="/task-new" component={MindmapNewForm} />
          <Route path="/task-view/:id" component={TaskViewEditForm} />
          <Route path="/mindmap-view/:id" component={MindmapViewEditForm} />
          <Route path="/image-view" component={MindmapImageViewer} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
