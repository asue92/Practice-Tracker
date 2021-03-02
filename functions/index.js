const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");

const {
  loginUser,
  signUpUser,
  getUserDetail,
  updateUserDetails,
  uploadProfilePhoto,
} = require("./APIs/users");

const {
  getAllTodos,
  getOneTodo,
  postOneTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");

app.get("/todos", auth, getAllTodos);
app.get("/todo/:todoId", auth, getOneTodo);
app.post("/todo", auth, postOneTodo);
app.delete("/todo/:todoId", auth, deleteTodo);
app.put("/todo/:todoId", auth, editTodo);

app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/user", auth, getUserDetail);
app.post("/user", auth, updateUserDetails);
app.post("/user/image", auth, uploadProfilePhoto);

exports.api = functions.https.onRequest(app);
