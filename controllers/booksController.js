const Book = require("../models/Book");
const Author = require("../models/Author");
const mongoose = require("mongoose");

const getAllBooks = async (req, res) => {
  const books = await Book.find();
  if (!books) return res.status(204).json({ message: "No Books found" });
  res.json(books);
};

const deleteBook = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Book ID required" });
  const book = await Book.findOne({ _id: req.body.id }).exec();
  if (!book) {
    return res
      .status(204)
      .json({ message: `Book ID ${req.body.id} not found` });
  }
  const result = await Book.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getBook = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Book ID required" });
  const book = await Book.findOne({ _id: req.params.id }).exec();
  if (!book) {
    return res
      .status(204)
      .json({ message: `Book ID ${req.params.id} not found` });
  }
  res.json(book);
};

const addNewBook = async (req, res) => {
  const { name, isbn, authorId, description } = req.body;

  if (!name || !isbn || !authorId) {
    return res
      .status(400)
      .json({ error: "Please provide name, isbn, and authorId" });
  }

  try {
    if (!mongoose.isValidObjectId(authorId)) {
      return res.status(400).json({ error: "Invalid authorId" });
    }
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const newBook = await Book.create({
      name,
      isbn,
      author: authorId,
      description,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { name, isbn, authorId } = req.body;

  try {
    if (!name || !isbn || !authorId) {
      return res
        .status(400)
        .json({ error: "Please provide name, isbn, and authorId" });
    }
    if (!mongoose.isValidObjectId(authorId)) {
      return res.status(400).json({ error: "Invalid authorId" });
    }
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { name, isbn, author: authorId },
      { new: true } // Return the updated document
    ).populate("author");

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
};

module.exports = {
  getAllBooks,
  deleteBook,
  getBook,
  updateBook,
  addNewBook,
};
