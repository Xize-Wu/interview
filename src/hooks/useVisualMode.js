import React, { useState } from "react";
export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(value, boo) {
    if (!value) {
      return mode;
    }
    setMode(value);
    if (!boo) {
      setHistory(prevHistory => [...prevHistory, value]);
    }
  }
  function back() {
    if(mode === initial){
      return mode
    }
    if (history.length >= 1) {
       history.splice(-1, 2);
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}