import React from "react";
import { Box } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import useTimer from "./hooks/useTimer";
import { formatTime } from "../util/formatTime";
import { toolStyles } from "./componentStyling";

import withStyles from "@material-ui/core/styles/withStyles";

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
    handleLog,
  } = useTimer(0);

  return (
    <Box border={1} padding={4}>
      <div align="center">
        <h3>Practice Timer {element}</h3>
        <p>{formatTime(timer)}</p>
        <div className="stopwatch-card">
          <div className="buttons">
            {!isActive && !isPaused ? (
              <button onClick={handleStart}>Start</button>
            ) : isPaused ? (
              <button onClick={(evt) => handlePause()}>Pause</button>
            ) : (
              <button onClick={handleResume}>Resume</button>
            )}
            <button onClick={handleReset} disabled={!isActive}>
              Reset
            </button>
            <button
              onClick={(evt) => handleLog(seconds, props.email, props.password)}
            >
              Log
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default withStyles(toolStyles)(Timer);
