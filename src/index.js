const express = require("express");
const router = require("./routes/router");
const app = express();

app.use(express.json());

router(app);

app.get("/", (req, res) => {
  res.send("Bienvenido");
});

app.listen(4000, () => {
  console.log("Estoy Activado");
});
