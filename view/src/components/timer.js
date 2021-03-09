import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import useTimer from "./hooks/useTimer";
import { formatTime } from "../util/formatTime";

const element = <FontAwesomeIcon icon={faClock} />;

const Timer = (props) => {
  const { seconds, setSeconds } = props;

  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(0);

  return (
    <div className="app">
      <h3>React Stopwatch {element}</h3>
      <div className="stopwatch-card">
        <p>{formatTime(timer)}</p>
        <div className="buttons">
          {!isActive && !isPaused ? (
            <button onClick={handleStart}>Start</button>
          ) : isPaused ? (
            <button onClick={(evt) => handlePause(seconds)}>Pause</button>
          ) : (
            <button onClick={handleResume}>Resume</button>
          )}
          <button onClick={handleReset} disabled={!isActive}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
