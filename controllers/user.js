const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../services/jwt");
async function register(req, res) {
  console.log("register", req.body);
  const user = new User(req.body);
  const { password, email } = req.body;
  try {
    if (!email) throw { msg: "Email is required" };
    if (!password) throw { msg: "Password is required" };
    // Revisamos si el email ya existe
    const foundEmail = await User.findOne({ email });
    if (foundEmail) throw { msg: "Email already exists" };

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    console.log(user.password);
    console.log("Todo bien en casa?");
    user.save();
    res.status(200).send();
    // user.save((err, user) => {

    // });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function login(req, res) {
  console.log("login", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw { msg: "Invalid email or passwordx" };
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) throw { msg: "____Invalid email or password" };
    console.log("Todo bien en casa?, ValidPassword", validPassword);
    const token = jwt.createToken(user, "12h");
    console.log("token", token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
}

function protected(req, res) {
  console.log("protected", req.body);
  res.status(200).send({ msg: "Contenido de endpoint protegido" });
}

function uploadAvatar(req, res) {
  console.log("uploadAvatar", req.files);
  const { id } = req.params;
  User.findById({ _id: id }, (err, userData) => {
    console.log("userData", userData);
    if (err) {
      req.status(500).send({ msg: "Error del servidor" });
    } else {
      if (!userData) {
        res.status(404).send({ msg: "No se encontró el usuario" });
      } else {
        let user = userData;
        if (req.files) {
          const avatar = req.files.avatar;
          const filePath = avatar.path;
          const fileSplit = filePath.split("/");
          console.log("fileSplit", fileSplit);
          const fileName = fileSplit[1];
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];
          if (fileExt != "png" && fileExt != "jpg" && fileExt != "jpeg") {
            req.status(400).send({
              msg: "Extensión de archivo no válida, extensiones permitidas: png, jpg, jpeg",
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate({ _id: id }, user, (err, userResult) => {
              if (err) {
                res.status(500).send({ msg: "Error del servidor" });
              } else {
                if (!userResult) {
                  res.status(404).send({ msg: "No se encontró el usuario" });
                } else {
                  res.status(200).send({ msg: "Avatar subido correctamente" });
                }
              }
            });
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  console.log("getAvatar", req.params);
  const { avatarName } = req.params;
  const filePath = `./uploads/${avatarName}`;
  console.log("filePath", filePath);
  fs.exists(filePath, (err) => {
    if (!err) {
      res.status(404).send({ msg: "No se encontró el avatar" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}
module.exports = {
  register,
  login,
  protected,
  uploadAvatar,
  getAvatar,
};
