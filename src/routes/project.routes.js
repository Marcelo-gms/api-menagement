const router = require("express").Router();

const {
  create,
  getAll,
  update,
  deleteProject,
  getById,
} = require("../controllers/ProjectController");
const imageUpload = require("../middlewares/imageUpload");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", imageUpload.single("projectImage"), create);
router.put("/:id", imageUpload.single("projectImage"), update);
router.delete("/:id", deleteProject);
 
module.exports = router;
