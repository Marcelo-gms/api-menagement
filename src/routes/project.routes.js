const router = require("express").Router();

const {
  create,
  getAll,
  update,
  deleteProject,
} = require("../controllers/ProjectController");
const imageUpload = require("../middlewares/imageUpload");

router.get("/", getAll);
router.post("/create", imageUpload.single("projectImage"), create);
router.put("/update/:id", imageUpload.single("projectImage"), update);
router.delete("/delete/:id", deleteProject);

module.exports = router;
