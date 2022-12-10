import "../App.css";
import React from "react";
export default function Gridbox({ alphabet, input, wordColor }) {
  return (
    <div style={{ padding: "10px" }}>
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
              let box = `${index}-${idx}`;
              let bg = false;
              if (wordColor) {
                bg = wordColor.some((x) => x === box);
              }

              return (
                <span
                  className="letter"
                  key={idx}
                  style={{
                    backgroundColor: bg ? "yellow" : "white",
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
