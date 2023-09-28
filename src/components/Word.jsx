import React from "react";

const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className="word">
      {selectedWord.split("").map((letter, key) => (
        <span className="letter" key={key}>
          {correctLetters.includes(letter) ? letter : ""}
        </span>
      ))}
    </div>
  );
};

export default Word;
