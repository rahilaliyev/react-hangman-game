import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotificationFunc } from "./utils/helper";

import "./App.css";
import LevelPopup from "./components/LevelPopup";

function App() {
  const [level, setLevel] = useState();
  const [levelPopup, setLevelPopup] = useState(true);
  const [selectedWord, setSelectedWord] = useState();
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const getWord = async () => {
    try {
      let lengthParam;

      if (level === "easy") {
        lengthParam = Math.floor(Math.random() * 3) + 5;
      } else if (level === "medium") {
        lengthParam = Math.floor(Math.random() * 4) + 7;
      } else if (level === "hard") {
        lengthParam = Math.min(Math.floor(Math.random() * 5) + 11, 15);
      }

      const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${lengthParam}`);
      const data = await response.json();

      setSelectedWord(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (level) {
      getWord();
    }
  }, [level]);

  useEffect(() => {
    const handleKeydown = e => {
      const { key, keyCode } = e;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        console.log(letter);

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            showNotificationFunc(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            showNotificationFunc(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, selectedWord]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setLevelPopup(true);

    getWord();
  }

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <LevelPopup setLevel={setLevel} levelPopup={levelPopup} setLevelPopup={setLevelPopup} />
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
