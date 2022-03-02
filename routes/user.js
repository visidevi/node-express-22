const express = require("express");
const multipart = require("connect-multiparty");

const UserController = require("../controllers/user.js");

const ad_auth = require("../middlewares/authentication.js");
const md_upload_avatar = multipart({ uploadDir: "./uploads" });
const api = express.Router();
api.post("/register", UserController.register);
api.post("/login", UserController.login);
api.get("/protected", [ad_auth.ensuredAuth], UserController.protected);
api.post(
  "/upload-avatar/:id",
  [ad_auth.ensuredAuth, md_upload_avatar],
  UserController.uploadAvatar
);
api.get("/avatar/:avatarName", UserController.getAvatar);
module.exports = api;
