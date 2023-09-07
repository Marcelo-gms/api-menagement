const Message = require("../models/MessageModel");

const send = require("../utils/sendMail");

const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name) {
    res.status(422).json({ err: "O Nome é obrigatório!" });
    return;
  }
  if (!email) {
    res.status(422).json({ err: "O e-mail é obrigatório!" });
    return;
  }
  if (!message) {
    res.status(422).json({ err: "A mesangem é obrigatória!" });
    return;
  }

  const sendSuccess = {
    name,
    email,
    message,
  };

  try {
    const resSend = await send(name, email, message);
    await Message.create(sendSuccess);
    res.status(200).json({ message: "E-mail enviado com sucesso!", resSend });
  } catch (error) {
    res.status(422).json({ sendError: "Error ao enviar e-mail" });
    console.log(error);
  }
};

const getAll = async (req, res) => {
  const messages = await Message.find({});

  res.status(200).json({ messages });
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  const message = await Message.findByIdAndDelete({ _id: id });
  console.log(message);

  if (!message) {
    res.status(400).json({ err: "Mensagem não encontrada!" });
    return;
  }

  res.status(200).json({ msg: "Mensagem apagada com sucesso!" });
};

module.exports = {
  sendMail,
  getAll,
  deleteMessage,
};
