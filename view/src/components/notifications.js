import React, { Component } from "react";
import { Divider, Container, Box } from "@material-ui/core";
import { toolStyles } from "./componentStyling";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

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
  render() {
    return (
      <Box border={1} padding={4}>
        <Container maxWidth="sm">
          {`Hi, ${this.props.name}. Welcome to Practice Tracker.`}
          <Divider />
          {this.convertSeconds(this.state.seconds)}
        </Container>
      </Box>
    );
  }
}

export default withStyles(toolStyles)(Notifications);
