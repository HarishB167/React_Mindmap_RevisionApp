import React, { useEffect, useState } from "react";
import Table from "../../components/desktop/Table";
import "./TaskList.css";

function TaskList(props) {
  useEffect(() => {
    props.onLoad();
  }, []);

  const onTaskItemClick = (id) => {
    props.history.push(`/task-view/${id}`);
  };

  const [tableData, setTableData] = useState([]);

  const headings = [
    "Title",
    "Revision Date",
    "Category",
    "Created",
    "Status",
    "",
  ];
  useEffect(() => {
    const data = props.tasks.map((item) => ({
      mindmapTitle: item.mindmapTitle,
      revisionDate: item.revisionDate,
      category: item.category,
      created: item.created,
      status: item.status ? "Done" : "Not Done",
      button: <span className="sprite more-vertical dTable_more_gray"></span>,
    }));
    setTableData(data);
  }, [props.tasks]);

  return (
    <div className="desktop_home">
      <span className="desktop_home__title">Tasks</span>
      <div className="dTable_container">
        {tableData && <Table headings={headings} data={tableData}></Table>}
      </div>
    </div>
  );
}

export default TaskList;
