import React, { Component } from "react";

import Timer from "./timer";
import Metronome from "./metronome";
import Notifications from "./notifications";
import Calendar from "./calendar";

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
    };
  }
  render() {
    return (
      <div className="App">
        <div className="row">
          {" "}
          <Notifications
            seconds={this.state.seconds}
            name={this.props.firstName}
            days={this.props.days}
          />{" "}
          <Timer
            seconds={this.state.seconds}
            email={this.props.email}
            password={this.props.password}
          />{" "}
          <Metronome />
          <div>
            <main></main>
          </div>{" "}
        </div>
        <Calendar />
      </div>
    );
  }
}

export default Interface;
