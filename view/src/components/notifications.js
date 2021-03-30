import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { toolStyles } from "./componentStyling";
import { summary } from "date-streaks";

import withStyles from "@material-ui/core/styles/withStyles";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
    };
  }

  convertSeconds = (seconds) => {
    let flooredHours = Math.floor(seconds / 3600);
    if (flooredHours === 1) {
      return `You have practiced for ${flooredHours.toLocaleString()} hour. Keep up the good work!`;
    }
    return `You have practiced for ${flooredHours.toLocaleString()} hours. Keep up the good work!`;
  };

  streakMessage = () => {
    let summaryObj = summary(this.props.days);
    console.log(summaryObj);
    if (summaryObj.currentStreak === 1) {
      return "";
    }
    if (summaryObj.todayInStreak && summaryObj.withinCurrentStreak === true) {
      return `You are currently on a ${summaryObj.currentStreak} day streak.`;
    }
  };

  render() {
    return (
      <Box border={1} padding={4} align="center">
        {`Hi, ${this.props.name}. Welcome to Practice Tracker.`}
        <p></p>
        <p> {this.streakMessage()}</p>
        {this.convertSeconds(this.state.seconds)}
      </Box>
    );
  }
}

export default withStyles(toolStyles)(Notifications);
