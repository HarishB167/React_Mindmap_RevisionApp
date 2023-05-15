import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryChooser from "./pages/CategoryChooser";
import MindmapNewForm from "./pages/MindmapNewForm";
import TaskViewEditForm from "./pages/TaskViewEditForm";
import MindmapViewEditForm from "./pages/MindmapViewEditForm";
import MindmapImageViewer from "./pages/MindmapImageViewer";
import NotFound from "./pages/NotFound";
import SideBar from "./components/desktop/SideBar";
import TaskList from "./pages/desktop/TaskList";
import DesktopHome from "./pages/desktop/DesktopHome";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./assets/css/desktopSprites.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  // Ref : https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  if (width <= 768)
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
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <ToastContainer />
        <DesktopHome />
      </React.Fragment>
    );
}

export default App;
