const express = require('express');
const Borrow = require('../models/Borrow');
const Return = require('../models/Return');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Return a book
router.post('/',authMiddleware, async (req, res) => {
    const { bookId } = req.body;

    try {
        const borrow = await Borrow.findOne({ bookId });
        if (!borrow) return res.status(404).json({ message: 'No borrow record found for this book' });

        const currentDate = new Date();
        let fine = 0;

        if (currentDate > borrow.dueDate) {
            const daysLate = Math.ceil((currentDate - borrow.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysLate * 10; // Example: $10 fine per day
        }

        const returnRecord = new Return({
            username: req.user.id,
            bookId,
            dueDate: borrow.dueDate,
            fineAmount: fine,
        });

        await returnRecord.save();
        await borrow.remove();

        const book = await Book.findById(bookId);
        book.available = true;
        await book.save();

        res.status(201).json({ message: 'Book returned successfully', fine });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
