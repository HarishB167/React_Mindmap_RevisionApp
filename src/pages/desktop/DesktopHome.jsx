import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import SideBar from "../../components/desktop/SideBar";
import TaskList from "./TaskList";
import { getTasksList } from "../../services/taskService";
import { getMindmapsList } from "../../services/mindmapService";
import MindmapList from "./MindmapList";

function DesktopHome(props) {
  const [data, setData] = useState({
    tasks: [],
    mindmaps: [],
    taskRetrieveProcessOn: false,
    mindmapsRetrieveProcessOn: false,
  });

  async function retrieveRenderTasks() {
    setData({ ...data, taskRetrieveProcessOn: true });
    const ts = await getTasksList();
    setData({ ...data, tasks: ts, taskRetrieveProcessOn: false });
  }

  async function retrieveRenderMindmaps() {
    setData({ ...data, mindmapsRetrieveProcessOn: true });
    const mMap = await getMindmapsList();
    setData({ ...data, mindmaps: mMap, mindmapsRetrieveProcessOn: false });
  }

  return (
    <main className="main_desktop">
      <Route component={SideBar} />
      <div className="main_dekstop__content">
        <Switch>
          <Route
            path="/mindmap-list"
            render={(props) => (
              <MindmapList
                onLoad={retrieveRenderMindmaps}
                mindmaps={data.mindmaps}
                isLoading={data.mindmapsRetrieveProcessOn}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <TaskList
                onLoad={retrieveRenderTasks}
                tasks={data.tasks}
                isLoading={data.taskRetrieveProcessOn}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </main>
  );
}

export default DesktopHome;
