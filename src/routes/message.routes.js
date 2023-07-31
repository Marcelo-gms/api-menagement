const router = require("express").Router();

const {
  sendMail,
  getAll,
  deleteMessage,
} = require("../controllers/MessageController");

router.post("/", sendMail);
router.get("/", getAll);
router.delete("/:id", deleteMessage);

module.exports = router;
