function getHello(req, res) {
  res.status(200).send({ message: "Hello World!" });
}
module.exports = {
    getHello
}