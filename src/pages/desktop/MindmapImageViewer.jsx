import React from "react";
import ImageViewer from "../../components/ImageViewer";
import queryString from "query-string";

function MindmapImageViewer(props) {
  const data = queryString.parse(props.history.location.search);
  return <ImageViewer imageUrl={data.imageUrl} />;
}

export default MindmapImageViewer;
