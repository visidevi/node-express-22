const moment = require("moment");
const jwt = require("../services/jwt");

const SECRET_KEY = "secret_key!@#@%$%&$%#%";

function ensuredAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "No tienes autorización",
    });
  }

  const token = req.headers.authorization.split(/['"]+/g, "")
    ? req.headers.authorization
    : req.headers.authorization;
  console.log("req.headers.authorization", token);
  const payload = jwt.decodeToken(token, SECRET_KEY);
  try {
    console.log("payload", payload);
    if (payload.exp <= moment().unix()) {
      return res.status(400).send({
        message: "El token ha expirado",
      });
    }
  } catch (err) {
    return res.status(400).send({ msg: `Token inválido ${err}` });
  }
  req.user = payload;
  next();
}
module.exports = {
  ensuredAuth,
};
