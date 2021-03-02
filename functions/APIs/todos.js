const { db } = require("../util/admin");

exports.getAllTodos = async (request, response) => {
  try {
    const data = await db
      .collection("todos")
      .orderBy("createdAt", "desc")
      .get();
    let todos = [];
    data.forEach((doc) => {
      todos.push({
        todoId: doc.id,
        title: doc.data().title,
        body: doc.data().body,
        createdAt: doc.data().createdAt,
      });
    });
    return response.json(todos);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.code });
  }
};

exports.postOneTodo = async (request, response) => {
  try {
    if (request.body.body.trim() === "") {
      return response.status(400).json({ body: "Must not be empty" });
    }

    if (request.body.title.trim() === "") {
      return response.status(400).json({ title: "Must not be empty" });
    }
    const newTodoItem = {
      title: request.body.title,
      body: request.body.body,
      createdAt: new Date().toISOString(),
    };

    const createdItem = await db.collection("todos").add(newTodoItem);

    const item = await db.collection("todos").doc(createdItem.id).get();
    const { title, body } = item.data();
    return response.json({ title, body });
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

exports.deleteTodo = async (request, response) => {
  try {
    const document = db.doc(`/todos/${request.params.todoId}`);
    const foundDoc = await document.get();
    if (!foundDoc.exists) {
      return response.status(404).json({ error: "Todo not found" });
    }
    document.delete();
    response.json({ message: "delete succesful!" });
  } catch (error) {
    return response.status(500).json({ error: error.code });
  }
};

exports.editTodo = async (request, response) => {
  try {
    if (request.body.todoId || request.body.createdAt) {
      response.status(403).json({ message: "Not allowed to edit" });
    }
    let document = await db.collection("todos").doc(`${request.params.todoId}`);
    await document.update(request.body);
    response.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: err.code,
    });
  }
};
