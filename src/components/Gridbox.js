import "../App.css";
import React, { useState, useEffect } from "react";

export default function Gridbox({ alphabet, input, match, setMatch }) {
  const [wordColor, setwordColor] = useState([]);

  const [data, setData] = useState([]);

  let arr = [];
  // eslint-disable-next-line
  const aa = alphabet.map((str) => {
    arr = [...arr, str.split("")];
    return str;
  });
  let R, C;
  // For searching in all 8 direction
  let x = [-1, -1, -1, 0, 0, 1, 1, 1];
  let y = [-1, 0, 1, -1, 1, -1, 0, 1];
  function searchArr(arr, row, col, word) {
    if (arr[row][col] !== word[0]) return false;
    let len = word.length;

    for (let dir = 0; dir < 8; dir++) {
      let k,
        rd = row + x[dir],
        cd = col + y[dir];

      for (k = 1; k < len; k++) {
        if (rd >= R || rd < 0 || cd >= C || cd < 0) break;

        if (arr[rd][cd] !== word[k]) break;

        rd += x[dir];
        cd += y[dir];
      }

      if (k === len) return true;
    }
    return false;
  }

  function patternSearch(arr, word) {
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (searchArr(arr, row, col, word)) {
          setwordColor([...wordColor, `${row}${col}`]);
          setMatch(true);
        }
      }
    }
  }

  useEffect(() => {
    setData(arr); // eslint-disable-next-line
    R = data.length !== 0 && alphabet[0].length;
    // eslint-disable-next-line
    C = alphabet.length;
    patternSearch(data, input);
  }, [alphabet, input]);

  return (
    <div style={{ padding: "10px" }}>
      {console.log("wordColor", wordColor)}
      {alphabet.map((data, index) => {
        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "spaceBetween",
            }}
          >
            {data.split("").map((char, idx) => {
              let box = `${index}${idx}`;
              let bg = false;
              if (wordColor) {
                bg = wordColor.some((x) => x === box);
              }

              return (
                <span
                  className="letter"
                  key={idx}
                  style={{
                    backgroundColor: bg ? "red" : "white",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
