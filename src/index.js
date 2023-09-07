require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 3000;

const db = require("./config/db");

app.use(
  cors({
    origin: ["https://marcelogomes.netlify.app", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const messageRouter = require("./routes/message.routes");
const projectRouter = require("./routes/project.routes");
const usersRouter = require("./routes/user.routes");

app.use("/message", messageRouter);
app.use("/project", projectRouter);
app.use("/users", usersRouter);
app.use("*", (req, res) => {
  res.status(404).send("Rota não encontrada!");
});

db().then(() => {
  app.listen(port, (err) => {
    if (err) return console.log("Error conect server");

    console.log("Server running!");
  });
});
