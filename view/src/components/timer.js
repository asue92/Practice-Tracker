import React from "react";
import { Box, Button } from "@material-ui/core";

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
              <Button variant="contained" onClick={handleStart}>
                Start
              </Button>
            ) : isPaused ? (
              <Button variant="contained" onClick={(evt) => handlePause()}>
                Pause
              </Button>
            ) : (
              <Button variant="contained" onClick={handleResume}>
                Resume
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleReset}
              disabled={!isActive}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={(evt) => handleLog(seconds, props.email, props.password)}
            >
              Log
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default withStyles(toolStyles)(Timer);
