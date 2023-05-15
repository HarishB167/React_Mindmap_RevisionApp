import React from "react";
import "./Table.css";

function HeadingWithCarot({ label }) {
  return (
    <div className="dTable_heading">
      {label}{" "}
      {label && (
        <span className="fa fa-caret-down HeadingWithCarot_carot"></span>
      )}
    </div>
  );
}

// Adding id and onClick left to table items.
function Table({ headings, data }) {
  return (
    <div className="dTable">
      <div className="dTable_head">
        {headings.map((item, idx) => (
          <HeadingWithCarot label={item} key={idx} />
        ))}
      </div>
      <div className="dTable_body">
        {data.map((item, idx) => (
          <div className="dTable_row" key={idx}>
            {Object.entries(item).map((val, idx) => (
              <div key={idx} className="dTable_data">
                {val[1]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
