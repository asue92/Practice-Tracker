const { admin, db } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require("../util/validators");

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

// Signup

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
      days: [],
      seconds: 0,
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

deleteImage = (imageName) => {
  const bucket = admin.storage().bucket();
  const path = `${imageName}`;
  return bucket
    .file(path)
    .delete()
    .then(() => {
      return;
    })
    .catch((error) => {
      return;
    });
};

// Upload profile picture
exports.uploadProfilePhoto = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return response.status(400).json({ error: "Wrong file type submited" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${request.user.username}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  deleteImage(imageFileName);
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${request.user.username}`).update({
          imageUrl,
        });
      })
      .then(() => {
        return response.json({ message: "Image uploaded successfully" });
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({ error: error.code });
      });
  });
  busboy.end(request.rawBody);
};

exports.getUserDetail = async (request, response) => {
  try {
    let userData = {};
    let newDoc = await db.doc(`/users/${request.user.username}`).get();
    if (newDoc.exists) {
      userData.userCredentials = newDoc.data();
    }
    response.json(userData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.code });
  }
};

exports.updateUserDetails = async (request, response) => {
  try {
    let document = await db.collection("users").doc(`${request.user.username}`);
    await document.update(request.body);
    response.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Cannot Update the value",
    });
  }
};
