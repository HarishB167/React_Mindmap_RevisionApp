import React, { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";
import sampleImage from "../assets/images/sampleImage1.jpg";
import "../assets/css/home.css";

function ImageViewer(props) {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    if (viewer) viewer.open({ type: "image", url: sampleImage });
    else {
      const mViewer = OpenSeadragon({
        id: "openseadragon1",
        prefixUrl:
          "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
        tileSources: { type: "image", url: sampleImage },
      });
      setViewer(mViewer);
      console.log("Showing opensedragon");
    }
  }, []);
  return (
    <div className="main">
      <div id="openseadragon1" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default ImageViewer;
