import React, { useEffect, useState } from "react";
import Table from "../../components/desktop/Table";
import LoadingPage from "../../components/LoadingPage";
import "./TaskList.css";

function TaskList(props) {
  useEffect(() => {
    props.onLoad();
  }, []);

  const onTaskItemClick = (e, id) => {
    e.preventDefault();
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
      mindmapTitle: (
        <a
          className="tableData_link"
          onClick={(e) => onTaskItemClick(e, item.id)}
        >
          {item.mindmapTitle}
        </a>
      ),
      revisionDate: item.revisionDate,
      category: item.category,
      created: item.created,
      status: item.status ? "Done" : "Not Done",
      button: <span className="sprite more-vertical dTable_more_gray"></span>,
    }));
    setTableData(data);
  }, [props.tasks]);

  const handleAdd = () => {
    props.history.push("/create-task");
  };

  return (
    <div className="desktop_home">
      <div className="desktop_top_row">
        <span className="desktop_home__title">Tasks</span>
        <span className="sprite plus add_btn" onClick={handleAdd}></span>
      </div>
      <div className="dTable_container">
        {props.isLoading && props.tasks.length === 0 ? (
          <LoadingPage />
        ) : (
          tableData && <Table headings={headings} data={tableData}></Table>
        )}
      </div>
    </div>
  );
}

export default TaskList;
