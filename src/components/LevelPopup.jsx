import React from "react";

const LevelPopup = ({ levelPopup, setLevelPopup, setLevel }) => {
  const choisingLevel = level => {
    setLevel(level);
    setLevelPopup(false);
  };

  return (
    <div className="popup-container" style={levelPopup ? { display: "flex" } : {}}>
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
