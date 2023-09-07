const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

const jwtSecret = process.env.JWT_SECRET;

const checkToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ err: "Não autorizado!" });
    return
  }

  const tokenVerify = jwt.verify(token, jwtSecret);

  const user = await User.findOne({ _id: tokenVerify._id });

  if (!user) {
    res.status(401).json({ err: "Não autorizado!" });
    return
  }
 
  req.user = user;
  next();
};
module.exports = checkToken;
