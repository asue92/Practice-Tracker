import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { authMiddleWare } from "../util/auth";
import { todoStyles } from "./componentStyling";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: "",
      title: "",
      body: "",
      todoId: "",
      errors: [],
      open: false,
      uiLoading: true,
      buttonType: "",
      viewOpen: false,
    };

    this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
    this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
    this.handleViewOpen = this.handleViewOpen.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("http://localhost:5000/practice-tracker-80315/us-central1/api/todos")
      .then((response) => {
        this.setState({
          todos: response.data,
          uiLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteTodoHandler(data) {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    let todoId = data.todo.todoId;
    axios
      .delete(
        `http://localhost:5000/practice-tracker-80315/us-central1/api/todo/${todoId}`
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleEditClickOpen(data) {
    this.setState({
      title: data.todo.title,
      body: data.todo.body,
      todoId: data.todo.todoId,
      buttonType: "Edit",
      open: true,
    });
  }

  handleViewOpen(data) {
    this.setState({
      title: data.todo.title,
      body: data.todo.body,
      viewOpen: true,
    });
  }

  render() {
    const DialogTitle = withStyles(todoStyles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const DialogContent = withStyles((theme) => ({
      root: {
        padding: theme.spacing(2),
      },
    }))(MuiDialogContent);

    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const { open, errors, viewOpen } = this.state;

    const handleClickOpen = () => {
      this.setState({
        todoId: "",
        title: "",
        body: "",
        buttonType: "",
        open: true,
      });
    };

    const handleSubmit = (event) => {
      authMiddleWare(this.props.history);
      event.preventDefault();
      const userTodo = {
        title: this.state.title,
        body: this.state.body,
      };
      let options = {};
      if (this.state.buttonType === "Edit") {
        options = {
          url: `http://localhost:5000/practice-tracker-80315/us-central1/api/todo/${this.state.todoId}`,
          method: "put",
          data: userTodo,
        };
      } else {
        options = {
          url:
            "http://localhost:5000/practice-tracker-80315/us-central1/api/todo",
          method: "post",
          data: userTodo,
        };
      }
      const authToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios(options)
        .then(() => {
          this.setState({ open: false });
          window.location.reload();
        })
        .catch((error) => {
          this.setState({ open: true, errors: error.response.data });
          console.log(error);
        });
    };

    const handleViewClose = () => {
      this.setState({ viewOpen: false });
    };

    const handleClose = (event) => {
      this.setState({ open: false });
    };

    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
      );
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <IconButton
            className={classes.floatingButton}
            color="primary"
            aria-label="Add Todo"
            onClick={handleClickOpen}
          >
            <AddCircleIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {this.state.buttonType === "Edit"
                    ? "Edit Todo"
                    : "Create a new Todo"}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleSubmit}
                  className={classes.submitButton}
                >
                  {this.state.buttonType === "Edit" ? "Save" : "Submit"}
                </Button>
              </Toolbar>
            </AppBar>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="todoTitle"
                    label="Todo Title"
                    name="title"
                    autoComplete="todoTitle"
                    helperText={errors.title}
                    value={this.state.title}
                    error={errors.title ? true : false}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="todoDetails"
                    label="Todo Details"
                    name="body"
                    autoComplete="todoDetails"
                    multiline
                    rows={25}
                    rowsMax={25}
                    helperText={errors.body}
                    error={errors.body ? true : false}
                    onChange={this.handleChange}
                    value={this.state.body}
                  />
                </Grid>
              </Grid>
            </form>
          </Dialog>

          <Grid container spacing={2}>
            {this.state.todos.map((todo) => (
              <Grid item xs={12} sm={6} key={todo.todoId}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {todo.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {dayjs(todo.createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`${todo.body.substring(0, 65)}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleViewOpen({ todo })}
                    >
                      {" "}
                      View{" "}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleEditClickOpen({ todo })}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.deleteTodoHandler({ todo })}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog
            onClose={handleViewClose}
            aria-labelledby="customized-dialog-title"
            open={viewOpen}
            fullWidth
            classes={{ paperFullWidth: classes.dialogeStyle }}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
              {this.state.title}
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                fullWidth
                id="todoDetails"
                name="body"
                multiline
                readOnly
                rows={1}
                rowsMax={25}
                value={this.state.body}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </DialogContent>
          </Dialog>
        </main>
      );
    }
  }
}

export default withStyles(todoStyles)(Todo);
