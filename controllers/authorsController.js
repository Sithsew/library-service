const Author = require("../models/Author");

const getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  if (!authors) return res.status(204).json({ message: "No Authors found" });
  res.json(authors);
};

const deleteAuthor = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Author ID required" });
  const author = await Author.findOne({ _id: req.body.id }).exec();
  if (!author) {
    return res
      .status(204)
      .json({ message: `Author ID ${req.body.id} not found` });
  }
  const result = await Author.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getAuthor = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Author ID required" });
  const author = await Author.findOne({ _id: req.params.id }).exec();
  if (!author) {
    return res
      .status(204)
      .json({ message: `Author ID ${req.params.id} not found` });
  }
  res.json(author);
};

const addNewAuthor = async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "Please provide first_name, and last_name" });
    }
    const newAuthor = await Author.create({ first_name, last_name });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAuthor = async (req, res) => {
  const authorId = req.params.id;
  const { first_name, last_name } = req.body;

  try {
    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "Please provide first_name, and last_name" });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { first_name, last_name },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllAuthors,
  deleteAuthor,
  getAuthor,
  updateAuthor,
  addNewAuthor,
};
