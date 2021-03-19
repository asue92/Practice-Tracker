import React, { Component } from "react";

import Timer from "./timer";
import Metronome from "./metronome";
import Notifications from "./notifications";

import withStyles from "@material-ui/core/styles/withStyles";

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
    };
    // console.log(this.props);
  }
  render() {
    return (
      <div>
        {" "}
        <Notifications seconds={this.state.seconds} />{" "}
        <Timer
          seconds={this.state.seconds}
          email={this.props.email}
          password={this.props.password}
        />{" "}
        <Metronome />
      </div>
    );
  }
}

export default Interface;
