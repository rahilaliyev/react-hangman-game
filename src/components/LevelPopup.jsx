import React from "react";

const LevelPopup = ({ isLevelPopup, choisingLevel }) => {
  return (
    <div className="popup-container" style={isLevelPopup ? { display: "flex" } : {}}>
      <div className="popup">
        <h2>Choose game level</h2>
        <div className="button-groups">
          <button onClick={() => choisingLevel("easy")}>Easy</button>
          <button onClick={() => choisingLevel("medium")}>Medium</button>
          <button onClick={() => choisingLevel("hard")}>Hard</button>
        </div>
      </div>
    </div>
  );
};

export default LevelPopup;
