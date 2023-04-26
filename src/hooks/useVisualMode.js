import React, { useState } from "react";
export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(value, boo) {
    if (value === "") {
      return mode;
    }
    setMode(value);
    if (boo) {
      history.splice(1,1)
      setHistory(prevHistory => [value, ...prevHistory]);
    } else {
      setHistory(prevHistory => [...prevHistory, value]);
    }
  }
  function back() {
    if (history.length >= 1) {
      const temp = history.splice(-1, 1);
      setHistory(temp);
      setMode(temp[temp.length - 1]);
    }
  }
  return { mode, transition, back };
}