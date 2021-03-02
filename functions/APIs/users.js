const { admin, db } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require("../util/validators");
// const { request, response } = require("express");

// Login

exports.loginUser = async (request, response) => {
  try {
    const user = {
      email: request.body.email,
      password: request.body.password,
    };
    const { valid, errors } = validateLoginData(user);
    if (!valid) return response.status(400).json(errors);

    const loggingInUser = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
    const userIdToken = await loggingInUser.user.getIdToken();

    return response.json({ userIdToken });
  } catch (error) {
    console.error(error);
    return response
      .status(403)
      .json({ general: "wrong credentials, please try again" });
  }
};

exports.signUpUser = async (request, response) => {
  try {
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      phoneNumber: request.body.phoneNumber,
      country: request.body.country,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
      username: request.body.username,
    };
    let token, userId;

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) return response.status(400).json(errors);

    let createdUser = await db.doc(`/users/${newUser.username}`).get();

    if (createdUser.exists) {
      response.status(400).json({ username: "This username is already taken" });
    } else {
      createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    }
    (userId = createdUser.user.uid),
      (token = await createdUser.user.getIdToken());

    const userCredentials = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId,
    };
    await db.doc(`/users/${newUser.username}`).set(userCredentials);

    return response.status(201).json({ token });
  } catch (err) {
    console.error(err);
    if (err.code === "auth/email-already-in-use") {
      return response.status(400).json({ email: "Email already in use" });
    } else {
      return response
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
  }
};

// {
//   "firstName": "John",
//   "lastName": "Mayer",
//   "email":"jm@martin.com",
//   "phoneNumber": "718-555-0101",
//   "country": "USA",
//   "password": "whygeorgia",
//   "confirmPassword": "whygeorgia",
//   "username": "jmayington"
// }
