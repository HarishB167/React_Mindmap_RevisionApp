import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MindmapSet from "../components/MindmapSet";
import LoadingPage from "../components/LoadingPage";
import "./MindmapList.css";

function MindmapList(props) {
  useEffect(() => {
    props.onLoad();
  }, []);

  const onMindmapItemClick = (id) => {
    props.history.push(`/mindmap-view/${id}`);
  };

  return (
    <React.Fragment>
      <SearchBar placeholder="Search for your mindmaps..." />
      <div className="content">
        {props.isLoading && props.mindmaps.length === 0 ? (
          <LoadingPage />
        ) : (
          props.mindmaps.map((item, idx) => (
            <MindmapSet
              key={idx}
              category={item.mindmapCategory}
              mindmapItems={item.mindmapItems}
              level={item.level}
              onMindmapItemClick={onMindmapItemClick}
            />
          ))
        )}
      </div>
    </React.Fragment>
  );
}

export default MindmapList;
