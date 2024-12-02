const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const isAdminMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new book (admin only)
router.post('/', authMiddleware,isAdminMiddleware, async (req, res) => {
    if (!req.user.admin) return res.status(403).json({ message: 'Access denied' });

    const { name, author, genre, available } = req.body;
    try {
        const newBook = new Book({ name, author, genre, available });
        await newBook.save();
        res.status(201).json({message:"book added successfully",newBook});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update book details (admin only)
router.put('/:id',authMiddleware, async (req, res) => {
    if (!req.user.admin) return res.status(403).json({ message: 'Access denied' });

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a book (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    if (!req.user.admin) return res.status(403).json({ message: 'Access denied' });

    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
