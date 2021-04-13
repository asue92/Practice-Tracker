import React from "react";
import { Box, Button, ButtonGroup, Typography } from "@material-ui/core";

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
    <Box border={1} padding={4} align="center">
      <Typography variant="h4">Practice Timer</Typography>
      <Typography variant="h2">{formatTime(timer)}</Typography>
      <ButtonGroup variant="contained" color="primary">
        {" "}
        {!isActive && !isPaused ? (
          <Button onClick={handleStart}>Start</Button>
        ) : isPaused ? (
          <Button onClick={(evt) => handlePause()}>Pause</Button>
        ) : (
          <Button onClick={handleResume}>Resume</Button>
        )}
        <Button onClick={handleReset} disabled={!isActive}>
          Reset
        </Button>
        <Button
          onClick={(evt) => handleLog(seconds, props.email, props.password)}
        >
          Log
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default withStyles(toolStyles)(Timer);
