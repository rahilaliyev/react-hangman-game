import React, { useEffect, useState } from "react";
import { checkWin } from "../utils/helper";

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
  let [finalMessage, setFinalMessage] = useState("");
  let [finalMessageRevealWord, setFinalMessageRevealWord] = useState("");

  useEffect(() => {
    if (wrongLetters.length > 5) {
      const result = checkWin(correctLetters, wrongLetters, selectedWord);
      let finalMessage = "";
      let finalMessageRevealWord = "";

      if (result === "win") {
        finalMessage = "Congratulations! You won!";
        setPlayable(false);
      } else if (result === "lose") {
        finalMessage = "You lost.";
        finalMessageRevealWord = `...the word was: ${selectedWord}`;
        setPlayable(false);
      }

      // Set the state here, not inside the if conditions
      setFinalMessage(finalMessage);
      setFinalMessageRevealWord(finalMessageRevealWord);
    }
  }, [correctLetters, wrongLetters, selectedWord, setPlayable]);

  useEffect(() => {
    setPlayable(true);
  }, []);

  return (
    <div className="popup-container" style={wrongLetters.length > 5 ? { display: "flex" } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
