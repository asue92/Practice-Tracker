import React, { Component } from "react";
import axios from "axios";
import { authMiddleWare } from "../util/auth";

import Account from "../components/account";
import Interface from "../components/interface";

import { Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NotesIcon from "@material-ui/icons/Notes";
import Avatar from "@material-ui/core/avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from "@material-ui/core/CircularProgress";

import { homeStyles } from "./styling";

class Home extends Component {
  state = {
    render: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      profilePicture: "",
      uiLoading: true,
      imageLoading: false,
    };
  }
  loadAccountPage = (event) => {
    this.setState({ render: true });
  };

  loadTodoPage = (event) => {
    this.setState({ render: false });
  };

  logoutHandler = (event) => {
    localStorage.removeItem("AuthToken");
    this.props.history.push("/login");
  };
  formatToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today.toString();
  };
  componentDidMount = async () => {
    try {
      authMiddleWare(this.props.history);
      const authToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      let userData = await axios.get(
        "http://localhost:5000/practice-tracker-80315/us-central1/api/user"
      );
      console.log("USERDATA>>>", userData);
      if (userData) {
        this.setState({
          firstName: userData.data.userCredentials.firstName,
          lastName: userData.data.userCredentials.lastName,
          email: userData.data.userCredentials.email,
          password: this.props.history.location.state.detail,
          phoneNumber: userData.data.userCredentials.phoneNumber,
          country: userData.data.userCredentials.country,
          username: userData.data.userCredentials.username,
          uiLoading: false,
          profilePicture: userData.data.userCredentials.imageUrl,
          seconds: userData.data.userCredentials.seconds,
          days: userData.data.userCredentials.days,
        });
        console.log("HOME STATE", this.state);
        if (
          this.state.days[this.state.days.length - 1] !== this.formatToday()
        ) {
          console.log("time to write");
          this.state.days.push(this.formatToday());
          await axios.post(
            "http://localhost:5000/practice-tracker-80315/us-central1/api/user",
            { days: this.state.days }
          );
        } else {
          console.log("Already logged today");
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({ errorMsg: "Error in retrieving the data" });
    }
  };
  render() {
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <center>
              <Avatar
                src={this.state.profilePicture}
                className={classes.avatar}
              />{" "}
              <Typography variant="h4" marginTop="10">
                {" "}
                {this.state.firstName} {this.state.lastName}
              </Typography>
            </center>
            <List>
              <ListItem button key="Home" onClick={this.loadTodoPage}>
                <ListItemIcon>
                  {" "}
                  <NotesIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem button key="Account" onClick={this.loadAccountPage}>
                <ListItemIcon>
                  {" "}
                  <AccountBoxIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>

              <ListItem button key="Logout" onClick={this.logoutHandler}>
                <ListItemIcon>
                  {" "}
                  <ExitToAppIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>

          <div>
            {this.state.render ? (
              <Account />
            ) : (
              <Interface
                seconds={this.state.seconds}
                email={this.state.email}
                password={this.state.password}
                firstName={this.state.firstName}
                days={this.state.days}
              />
            )}
          </div>
        </div>
      );
    }
  }
}

export default withStyles(homeStyles)(Home);
