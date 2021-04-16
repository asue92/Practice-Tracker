import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import { toolStyles } from "./componentStyling";
import { summary } from "date-streaks";

import withStyles from "@material-ui/core/styles/withStyles";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
      days: props.days,
    };
  }

  convertSeconds = (seconds) => {
    let flooredHours = Math.floor(seconds / 3600);
    if (flooredHours === 1) {
      return `You have practiced for ${flooredHours.toLocaleString()} hour. Keep up the good work!`;
    }
    if (isNaN(flooredHours) || flooredHours <= 0) {
      return "You haven't even practiced for an hour yet! Get started!";
    }
    return `You have practiced for ${flooredHours.toLocaleString()} hours. Keep up the good work!`;
  };

  streakMessage = (input) => {
    if (input.currentStreak === 1) {
      return "";
    }
    if (input.todayInStreak && input.withinCurrentStreak === true) {
      return `You are currently on a ${input.currentStreak} day streak.`;
    }
  };

  render() {
    return (
      <Box border={1} padding={4} align="center">
        <Typography>
          {" "}
          {`Hi, ${this.props.name}. Welcome to Practice Tracker.`}
        </Typography>
        <Typography>{this.streakMessage(summary(this.state.days))}</Typography>
        <Typography> {this.convertSeconds(this.state.seconds)}</Typography>
      </Box>
    );
  }
}

export default withStyles(toolStyles)(Notifications);
