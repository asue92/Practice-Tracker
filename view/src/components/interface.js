import React, { Component } from "react";

import Timer from "./timer";
import Metronome from "./metronome";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
    };
  }
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <h2>how are you?</h2>
        <Timer seconds={this.state.seconds} />
        <Metronome />
      </div>
    );
  }
}

export default Interface;
