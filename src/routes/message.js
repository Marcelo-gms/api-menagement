const router = require("express").Router();

const {sendMail} = require("../controllers/MessageController")


router.post("/",sendMail)

module.exports = router