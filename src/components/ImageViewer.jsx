import React, { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";
import "./ImageViewer.css";

function ImageViewer({ imageUrl }) {
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    if (viewer) viewer.open({ type: "image", url: imageUrl });
    else {
      const mViewer = OpenSeadragon({
        id: "openseadragon1",
        prefixUrl:
          "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
        tileSources: { type: "image", url: imageUrl },
      });
      setViewer(mViewer);
    }
  }, []);
  return (
    <div id="openseadragon1" style={{ width: "100%", height: "100%" }}></div>
  );
}

export default ImageViewer;
