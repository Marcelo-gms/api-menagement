const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const createToken = async (email, _id) => {
  const token = await jwt.sign({ email, _id }, jwtSecret, {
    expiresIn: "7d",
  });

  return token;
};

module.exports = createToken;
