const save = (req, res) => {
  console.log("entrei na função save.");
  const { title, content } = req.body;
  const image = req.file;

  if (!title) {
    return res.status(422).json({ messageError: "O nome é obrigatório" });
  }

  if (!content) {
    return res.status(422).json({ messageError: "A descrição é obrigatória" });
  }

  if (image) {
    console.log(image);
  }

  const project = {
    title,
    content,
    image:image.filename
  };

  console.log(project);

  res.status(201).json({ message: "Projeto criado com sucesso!", project });
};

module.exports = {
  save,
};
