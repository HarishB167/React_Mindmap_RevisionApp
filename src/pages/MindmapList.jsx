import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MindmapSet from "../components/MindmapSet";
import { getMindmaps } from "../services/mindmapService";
import "./MindmapList.css";

function MindmapList(props) {
  const [mindmaps, setMindmaps] = useState([]);

  useEffect(() => {
    async function retrieveRenderMindmaps() {
      const mMap = await getMindmaps();
      setMindmaps(mMap);
    }
    retrieveRenderMindmaps();
  }, []);

  const onMindmapItemClick = (id) => {
    props.history.push(`/mindmap-view/${id}`);
  };

  return (
    <React.Fragment>
      <SearchBar placeholder="Search for your mindmaps..." />
      <div className="content">
        {mindmaps.map((item, idx) => (
          <MindmapSet
            key={idx}
            category={item.mindmapCategory}
            mindmapItems={item.mindmapItems}
            level={item.level}
            onMindmapItemClick={onMindmapItemClick}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default MindmapList;
