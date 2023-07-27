require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

const db = require("./config/db");

app.use(cors({ origin: "https://marcelogomes.netlify.app/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messageRouter = require("./routes/message");

app.use("/message", messageRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Salve porra!" });
});

db().then(() => {
  app.listen(port, (err) => {
    if (err) return console.log("Error conect server");

    console.log("Server running!");
  });
});
