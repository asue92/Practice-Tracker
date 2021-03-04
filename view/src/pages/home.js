import React, { Component } from "react";
import axios from "axios";
import { authMiddleWare } from "../util/auth";

import Account from "../components/account";
import Todo from "../components/todo";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
          phoneNumber: userData.data.userCredentials.phoneNumber,
          country: userData.data.userCredentials.country,
          username: userData.data.userCredentials.username,
          uiLoading: false,
          profilePicture: userData.data.userCredentials.imageUrl,
        });
      }
    } catch (error) {
      if (error.response.status === 403) {
        this.props.history.push("/login");
      }
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
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                TodoApp
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <center>
              <Avatar
                src={this.state.profilePicture}
                className={classes.avatar}
              />
              <p>
                {" "}
                {this.state.firstName} {this.state.lastName}
              </p>
            </center>
            <Divider />
            <List>
              <ListItem button key="Todo" onClick={this.loadTodoPage}>
                <ListItemIcon>
                  {" "}
                  <NotesIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Todo" />
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

          <div>{this.state.render ? <Account /> : <Todo />}</div>
        </div>
      );
    }
  }
}

export default withStyles(homeStyles)(Home);
