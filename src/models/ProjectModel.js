const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Project = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stack: {
    type: Array,
    required: true,
  },
  projectImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Projects", Project);
