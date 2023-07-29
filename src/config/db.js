const mongoose = require("mongoose");

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

const db = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${db_user}:${db_pass}@mg.8bzquzl.mongodb.net/db?retryWrites=true&w=majority`
    );
    console.log("Conectado ao banco de dados!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;