const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoUrl = process.env.MONGO_URI || "mongodb://login-db:27017/myapp";
console.log(mongoUrl);
mongoose.connect(mongoUrl, { useNewUrlParser: true });

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/singup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    await user.save();
    res.send("Usuario criado com sucesso").status(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  const user = await User.findOne({ username: username, password: password });

  if (!user) {
    res.send("credencias erradas").status(400);
  }

  res.send("usuario logado").status(200);
});

app.listen(4000, () => {
  console.log("Login rodando na porta 4000");
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
