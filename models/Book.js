const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isbn: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
