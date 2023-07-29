const router = require("express").Router();

const { save } = require("../controllers/ProjectController");
const imageUpload = require("../middlewares/imageUpload");

router.post("/", imageUpload.single("image"), save);

module.exports = router;
