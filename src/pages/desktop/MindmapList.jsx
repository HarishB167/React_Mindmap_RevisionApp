import React, { useEffect, useState } from "react";
import Table from "../../components/desktop/Table";
import LoadingPage from "../../components/LoadingPage";
import "./MindmapList.css";

function MindmapList(props) {
  useEffect(() => {
    props.onLoad();
  }, []);

  const onMindmapItemClick = (e, id) => {
    e.preventDefault();
    props.history.push(`/mindmap-view/${id}`);
  };

  const [tableData, setTableData] = useState([]);

  const headings = [
    "Title",
    "Category",
    "Created",
    "Next Revision",
    "Revision Level",
  ];
  useEffect(() => {
    const data = props.mindmaps.map((item) => ({
      mindmapTitle: (
        <a
          className="tableData_link"
          onClick={(e) => onMindmapItemClick(e, item.id)}
        >
          {item.mindmapTitle}
        </a>
      ),
      category: item.category,
      created: item.created,
      nextRevision: item.nextRevision,
      level: item.level,
    }));
    setTableData(data);
  }, [props.mindmaps]);

  const handleAdd = () => {
    props.history.push("/create-task");
  };

  return (
    <div className="desktop_home">
      <div className="desktop_top_row">
        <span className="desktop_home__title">Mindmaps</span>
        <span className="sprite plus add_btn" onClick={handleAdd}></span>
      </div>
      <div className="dTable_container">
        {props.isLoading && props.mindmaps.length === 0 ? (
          <LoadingPage />
        ) : (
          tableData && <Table headings={headings} data={tableData}></Table>
        )}
      </div>
    </div>
  );
}

export default MindmapList;
