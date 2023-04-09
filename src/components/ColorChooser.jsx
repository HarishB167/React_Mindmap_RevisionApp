import React from "react";

function ColorInputItem({ inputName, colorValue }) {
  return (
    <React.Fragment>
      <input
        className="color-chooser-input"
        id={`color-${colorValue}`}
        type="radio"
        name={inputName}
        value={colorValue}
      />
      <label
        for={`color-${colorValue}`}
        className="color-chooser"
        style={{ background: colorValue }}
      ></label>
    </React.Fragment>
  );
}

function ColorChooser({ label, name, colorList }) {
  return (
    <React.Fragment>
      <label for={name}>{label}:</label>
      <div className="color-chooser-container">
        {colorList.map((color, idx) => (
          <ColorInputItem key={idx} inputName={name} colorValue={color} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default ColorChooser;
