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
    console.error(err);
    return response.status(500).json({ error: err.code });
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
