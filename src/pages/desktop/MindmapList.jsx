import React, { useEffect, useState } from "react";
import Table from "../../components/desktop/Table";
import "./MindmapList.css";

function MindmapList(props) {
  useEffect(() => {
    props.onLoad();
  }, []);

  const onMindmapItemClick = (id) => {
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
      mindmapTitle: item.mindmapTitle,
      category: item.category,
      created: item.created,
      nextRevision: item.nextRevision,
      level: item.level,
    }));
    setTableData(data);
  }, [props.mindmaps]);

  return (
    <div className="desktop_home">
      <span className="desktop_home__title">Mindmaps</span>
      <div className="dTable_container">
        {tableData && <Table headings={headings} data={tableData}></Table>}
      </div>
    </div>
  );
}

export default MindmapList;
