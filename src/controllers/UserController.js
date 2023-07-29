const User = require("../models/UserModel");

const createToken = require("../utils/createToken");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ err: "Usuário já cadastrado no sistema!" });
    return;
  }

  if (name) {
    if (name.length < 3) {
      res
        .status(422)
        .json({ err: "O nome precisa ter no minímo 3 caracteres!" });
      return;
    }
  } else {
    res.status(422).json({ err: "O nome é obrigatório!" });
    return;
  }

  if (email) {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      res.status(422).json({ err: "E-mail invalido!" });
      return;
    }
  } else {
    res.status(422).json({ err: "O e-mail é obrigatório!" });
    return;
  }
  if (password) {
    if (password.length <= 5) {
      res
        .status(422)
        .json({ err: "A senha precisa ter no minímo 6 caracteres!" });
      return;
    }
    if (password != confirmPassword) {
      res
        .status(422)
        .json({ err: "A senha e a confirmação de senha precisam ser iguais!" });
      return;
    }
  } else {
    res.status(422).json({ err: "A senha é obrigatória!" });
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

  res.status(422).json({
    msg: "Usuário registrado com sucesso!",
    user: { name, email },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res
      .status(422)
      .json({ err: "Usuário não cadastrado ou o e-mail é inválido!" });
    return;
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  console.log(passwordIsValid);

  if (!passwordIsValid) {
    res.status(422).json({ err: "A senha está incorreta!" });
    return;
  }

  const token = await createToken(user.email, user._id);

  res.status(422).json({
    msg: "Login feito com sucesso! Bem-Vindo.",
    user: { name: user.name, email: user.email, token },
  });
};

module.exports = { register, login };
