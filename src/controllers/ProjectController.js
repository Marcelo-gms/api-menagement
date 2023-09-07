const Project = require("../models/ProjectModel");

const create = async (req, res) => {
  const { name, description, stack } = req.body;
  const projectImage = req.file;

  if (!name) {
    return res.status(400).json({ err: "O nome é obrigatório." });
  }

  if (!description) {
    return res.status(400).json({ err: "A descrição é obrigatória." });
  }
  if (!stack) {
    return res
      .status(400)
      .json({ err: "As tecnologias usadas são obrigatórias." });
  }
  if (!projectImage) {
    return res.status(400).json({ err: "A imagem é obrigatória." });
  }

  const stackModified = stack.split(",");

  const project = {
    name,
    description,
    stack: [...stackModified],
    projectImage: `https://menage.onrender.com/uploads/imageProject/${projectImage?.filename}`,
  };

  await Project.create(project);

  res.status(201).json({ msg: "Projeto criado com sucesso!", project });
};

const getAll = async (req, res) => {
  const projects = await Project.find({});

  res.status(200).json(projects);
};
const getById = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById({ _id: id });

  if (!project) {
    res.status(404).json({ err: "Projeto não encontrado." });
    return;
  }

  res.status(200).json(project);
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, description, stack } = req.body;
  const projectImage = req.file;

  let project = await Project.findOne({ _id: id });

  if (!project) {
    res.status(404).json({ err: "O projeto não existe!" });
  }

  if (name) {
    project.name = name;
  }
  if (description) {
    project.description = description;
  }
  if (stack) {
    project.stack = stack.split(",");
  }
  if (projectImage) {
    project.projectImage = projectImage.filename;
  }

  await project.save();

  res.status(200).json({ msg: "Projeto atualizado com sucesso!" });
};
const deleteProject = async (req, res) => {
  const id = req.params.id;

  await Project.findOneAndDelete({ _id: id });

  res.status(200).json({ msg: "Projeto apagado com sucesso!" });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProject,
};
