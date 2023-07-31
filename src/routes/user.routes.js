const router = require("express").Router();

const { register, login, update } = require("../controllers/UserController");
const imageUpload = require("../middlewares/imageUpload");
const checkToken = require("../middlewares/checkTokenIsValide");

router.post("/register", register);
router.post("/login", login);
router.put("/update", checkToken, imageUpload.single("imageProfile"), update);

module.exports = router;
