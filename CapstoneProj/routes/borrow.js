const express = require('express');
const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Borrow a book
router.post('/', authMiddleware,async (req, res) => {
    console.log("borrow api")
    try {
        const { bookId } = req.body;
        console.log(bookId);
        console.log("i was here");
        const book = await Book.findById(bookId);
    
        if (!book || !book.available) {
          return res.status(404).json({ message: "Book not available" });
        }
    
        await Borrow.create({
          username: req.body.username,
          bookid: book._id,
        });
    
        book.available = false;
        await book.save();
    
        res.status(200).json({ message: "Book borrowed successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

module.exports = router;
