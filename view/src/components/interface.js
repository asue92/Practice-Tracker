import React, { Component } from "react";

import Timer from "./timer";
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
    // const { classes } = this.props;
    return (
      <div>
        <h1>hello world</h1>
        <Timer seconds={this.state.seconds} />
      </div>
    );
  }
}

export default Interface;
