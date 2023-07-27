const send = require("../utils/sendMail");

const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  const sendError = [];

  if (!name) {
    res.status(422).json({ sendError: "O Nome é obrigatório!" });
    return;
  }
  if (!email) {
    res.status(422).json({ sendError: "O e-mail é obrigatório!" });
    return;
  }
  if (!message) {
    res.status(422).json({ sendError: "A mesangem é obrigatória!" });
    return;
  }

  const sendSuccess = {
    name,
    email,
    message,
  };

  try {
    const resSend = await send(name,email, message);
    res
      .status(200)
      .json({ message: "E-mail enviado com sucesso!", resSend });
  } catch (error) {
    res.status(422).json({ sendError: "Error ao enviar e-mail" });
    console.log(error);
  }
};

module.exports = {
  sendMail,
};
