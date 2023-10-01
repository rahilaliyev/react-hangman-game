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
import { LEVELS_OBJ } from "./utils/constants";

function App() {
  const [level, setLevel] = useState();
  const [selectedWord, setSelectedWord] = useState();
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [isLevelPopup, setIsLevelPopup] = useState(true);
  const [isPlayable, setIsPlayable] = useState(true);
  const [isShowNotification, setIsShowNotification] = useState(false);

  const getWord = async () => {
    try {
      let lengthParam;

      lengthParam = LEVELS_OBJ[level];

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
      if (isPlayable && level && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        console.log(letter);

        if (selectedWord?.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            showNotificationFunc(setIsShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            showNotificationFunc(setIsShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, isPlayable, selectedWord, level]);

  function playAgain() {
    setIsPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setIsLevelPopup(true);

    getWord();
  }

  const choisingLevel = level => {
    setLevel(level);
    setIsLevelPopup(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <LevelPopup isLevelPopup={isLevelPopup} choisingLevel={choisingLevel} />
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        isPlayable={isPlayable}
        playAgain={playAgain}
        setIsPlayable={setIsPlayable}
        setLevel={setLevel}
      />
      <Notification isShowNotification={isShowNotification} />
    </div>
  );
}

export default App;
