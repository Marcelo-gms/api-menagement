const User = require("../models/UserModel");

const createToken = require("../utils/createToken");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json({ err: "Usuário já cadastrado no sistema!" });
    return;
  }

  if (name) {
    if (name.length < 3) {
      res
        .status(400)
        .json({ err: "O nome precisa ter no minímo 3 caracteres!" });
      return;
    }
  } else {
    res.status(400).json({ err: "O nome é obrigatório!" });
    return;
  }

  if (email) {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      res.status(400).json({ err: "E-mail invalido!" });
      return;
    }
  } else {
    res.status(400).json({ err: "O e-mail é obrigatório!" });
    return;
  }
  if (password) {
    if (password.length <= 5) {
      res
        .status(400)
        .json({ err: "A senha precisa ter no minímo 6 caracteres!" });
      return;
    }
    if (password != confirmPassword) {
      res
        .status(400)
        .json({ err: "A senha e a confirmação de senha precisam ser iguais!" });
      return;
    }
  } else {
    res.status(400).json({ err: "A senha é obrigatória!" });
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = {
    name,
    email,
    password: passwordHash,
  };

  const userCreated = await User.create(newUser);

  const token = await createToken(userCreated.email, userCreated._id);

  res.status(201).json({
    name,
    email,
    token,
  });
};

const getAll = async (req, res)=>{
  const users = await User.find({}).select("-password");

  res.status(200).json(users)
}

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    res
      .status(400)
      .json({ err: "Usuário não cadastrado ou o e-mail é inválido!" });
    return;
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    res.status(400).json({ err: "A senha está incorreta!" });
    return;
  }

  const token = await createToken(user.email, user._id);

  res.status(200).json({
    name: user.name,
    email: user.email,
    token,
  });
};

const update = async (req, res) => {
  const { name, email, password } = req.body;

  const user = req.user;

  const imageProfile = req.file;

  if (imageProfile) {
    user.imageProfile = imageProfile.filename;
  }

  if (name) {
    if (name.length < 3) {
      res
        .status(400)
        .json({ err: "O nome precisa ter no minímo 3 caracteres!" });
      return;
    } else {
      user.name = name;
    }
  }

  if (password) {
    if (password.length <= 5) {
      res
        .status(400)
        .json({ err: "A senha precisa ter no minímo 6 caracteres!" });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  await user.save();

  res.status(200).json({msg:"Atualizado com sucesso!"});
};

module.exports = { register,getAll, login, update };
