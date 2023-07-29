const multer = require("multer");
const path = require("path");

const storageUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("project")) {
      folder = "imageProject";
    } else {
      folder = "imageProfile";
    }

    cb(null, path.join(__dirname, `../uploads/${folder}`));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}${Math.floor(Math.random() * 999)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const imageUpload = multer({
  storage: storageUpload,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      cb(new Error("Por favor, envie fotos com extenção png ou jpg somente."));
      return;
    }
    cb(null, true);
  },
});

module.exports = imageUpload;
