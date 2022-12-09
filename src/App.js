import "./App.css";
import React, { useState, useEffect } from "react";
import GridBox from "./components/Gridbox.js";

export default function App() {
  const [data, setData] = useState([]);
  const [words, setWords] = useState([]);
  const [select, setSelect] = useState(0);
  const [alphabet, setAlphabet] = useState([]);
  const [input, setInput] = useState("");
  const [checkedWord, setCheckedWord] = useState([]);
  const [match, setMatch] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const getData = async () => {
    const response = await fetch("wordsearch.json");
    const newData = await response.json();
    setData(newData.puzzle);
    setWords(newData.puzzle[0].find_words);
    setAlphabet(newData.puzzle[0].Alphabet_grid);
  };

  const handleCheck = () => {
    const check = [...checkedWord];
    if (match) {
      check.push(input);
    } else {
      setIsMatched(true);
      setTimeout(() => {
        setIsMatched(false);
      }, 3000);
    }
    setCheckedWord(check);
    setInput("");
    // setMatch(false);
  };
  useEffect(() => {
    const findWord = { ...data[select] };
    const findAlphabet = { ...data[select] };
    setWords(findWord.find_words);
    setAlphabet(findAlphabet.Alphabet_grid);
    // eslint-disable-next-line
  }, [select]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {isMatched && (
        <div style={{ padding: "10px", backgroundColor: "red" }}>
          word is not matched
        </div>
      )}
      <h1>Cricket word Search</h1>
      <div className="container">
        <aside className="aside">
          <h3>Find the words</h3>
          <div className="wordsBox">
            {words &&
              words.map((word, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      textDecoration: checkedWord.includes(word)
                        ? "line-through"
                        : "none",
                    }}
                    className="word"
                  >
                    {word}
                  </div>
                );
              })}
          </div>
        </aside>
        <div className="">
          <select
            className="select"
            onChange={(e) => setSelect(Number(e.target.value))}
          >
            puzzle
            <option value="0">Puzzle 1</option>
            <option value="1">Puzzle 2</option>
          </select>
          <input
            className="input"
            placeholder="Enter the word"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
          />
          <button onClick={() => handleCheck()}>Submit</button>
          <div className="box">
            {alphabet && (
              <GridBox
                alphabet={alphabet}
                input={input}
                match={match}
                setMatch={setMatch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
