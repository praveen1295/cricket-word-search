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
  const [match, setMatch] = useState(true);
  const [wordColor, setwordColor] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [text, setText] = useState("");

  const getData = async () => {
    const response = await fetch("wordsearch.json");
    const newData = await response.json();
    setData(newData.puzzle);
    setWords(newData.puzzle[0].find_words);
    setAlphabet(newData.puzzle[0].Alphabet_grid);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const findWord = { ...data[select] };
    const findAlphabet = { ...data[select] };
    setWords(findWord.find_words);
    setAlphabet(findAlphabet.Alphabet_grid);
    setwordColor([]);
    // eslint-disable-next-line
  }, [select]);

  useEffect(() => {
    setGridData(arr);
    // eslint-disable-next-line
  }, [text]);

  let arr = [];
  // eslint-disable-next-line
  const aa =
    alphabet &&
    alphabet.map((str) => {
      arr = [...arr, str.split("")];
      return str;
    });
  let R = gridData.length !== 0 && alphabet[0].length;
  let C = alphabet && alphabet.length;
  let x = [-1, -1, -1, 0, 0, 1, 1, 1];
  let y = [-1, 0, 1, -1, 1, -1, 0, 1];
  function search2D(grid, row, col, word) {
    if (grid[row][col] !== word[0]) return false;
    let len = word.length;
    for (let dir = 0; dir < 8; dir++) {
      let store = [];
      store.push(`${row}-${col}`);
      let k,
        rd = row + x[dir],
        cd = col + y[dir];
      for (k = 1; k < len; k++) {
        if (rd >= R || rd < 0 || cd >= C || cd < 0) break;
        if (grid[rd][cd] !== word[k]) break;
        store.push(`${rd}-${cd}`);
        rd += x[dir];
        cd += y[dir];
      }
      if (k === len) {
        setwordColor([...wordColor, ...store]);
        return true;
      }
    }
    return false;
  }
  function patternSearch(grid, word) {
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (search2D(grid, row, col, word)) {
          setCheckedWord([...checkedWord, text]);
          setMatch(true);
        }
      }
    }
  }

  const handleComplete = () => {
    if (words.length === checkedWord.length) return true;
  };
  const handleSubmit = () => {
    setInput(text);
    if (words.some((w) => w === text)) {
      patternSearch(gridData, text);
      if (handleComplete()) {
        alert("Hurray");
      }
    } else {
      setMatch(false);
      setTimeout(() => {
        setMatch(true);
      }, 3000);
    }
    setText("");
  };
  return (
    <div className="App">
      {!match && (
        <div
          style={{
            width: "100%",
            background: "red",
            padding: "20px",
            color: "white",
            fontSize: "16px",
          }}
        >
          Not Matched
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
            value={text}
            // ref={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
          />
          <button onClick={() => handleSubmit()}>Submit</button>
          <div className="box">
            {alphabet && (
              <GridBox
                alphabet={alphabet}
                input={input}
                wordColor={wordColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
