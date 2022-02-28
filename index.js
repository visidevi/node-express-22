const mongoose = require("mongoose");

const app = require("./app");
const port = 3000;
const url =
  "mongodb+srv://admin:admin@cluster0.7acnc.mongodb.net/mydb?retryWrites=true&w=majority";

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    try {
      if (err) {
        console.log("Error al conectar a la base de datos");
      } else {
        console.log("Conexión a la base de datos establecida");
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);
