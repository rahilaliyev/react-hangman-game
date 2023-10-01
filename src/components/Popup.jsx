import React, { useEffect, useState } from "react";
import { checkWin } from "../utils/helper";

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setIsPlayable,
  playAgain,
  isPlayable,
  setLevel,
}) => {
  let [finalMessage, setFinalMessage] = useState("");
  let [finalMessageRevealWord, setFinalMessageRevealWord] = useState("");

  useEffect(() => {
    const result = checkWin(correctLetters, wrongLetters, selectedWord);
    if (result === "win") {
      setFinalMessage("Congratulations! You won!");
      setFinalMessageRevealWord("");
      setIsPlayable(false);
      setLevel();
    } else if (result === "lose") {
      setFinalMessage("You lost.");
      setFinalMessageRevealWord(`...the word was: ${selectedWord}`);
      setIsPlayable(false);
      setLevel();
    }
  }, [correctLetters, setLevel, wrongLetters, selectedWord, setIsPlayable]);

  useEffect(() => {
    setIsPlayable(true);
  }, []);

  return (
    <div className="popup-container" style={!isPlayable ? { display: "flex" } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
