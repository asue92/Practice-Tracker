import React, { Component } from "react";

import { Box, Button } from "@material-ui/core";
import { toolStyles } from "./componentStyling";
import withStyles from "@material-ui/core/styles/withStyles";

import click1 from "../sounds/click1.wav";
import click2 from "../sounds/click2.wav";
import Typography from "@material-ui/core/Typography";

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState((state) => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true,
        },
        this.playClick
      );
    }
  };

  handleBpmChange = (event) => {
    const bpm = event.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm,
      });
    } else {
      this.setState({ bpm });
    }
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <Box border={1} padding={4}>
        <h4 align="center">Metronome</h4>
        <Typography align="center">
          {bpm} BPM
          <input
            className="slider"
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
          <Button variant="contained" onClick={this.startStop}>
            {playing ? "Stop" : "Start"}
          </Button>
        </Typography>
      </Box>
    );
  }
}

export default withStyles(toolStyles)(Metronome);
