const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoUrl = process.env.MONGO_URI || "mongodb://payment-db:27017/myapp";
console.log(mongoUrl);
mongoose.connect(mongoUrl, { useNewUrlParser: true });

const PaymentSchema = new mongoose.Schema({
  username: String,
  numberCard: String,
  payDate: Date,
});

const Payment = mongoose.model("Payment", PaymentSchema);

app.post("/payment", async (req, res) => {
  const payment = new Payment({
    username: req.body.username,
    numberCard: req.body.numberCard,
    payDate: Date.now(),
  });

  try {
    await payment.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.listen(3000, () => {
  console.log("Pagamento rodando na porta 3000");
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
