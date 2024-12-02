const mongoose = require('mongoose');
const BorrowSchema = new mongoose.Schema({
    username: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', unique: true },
    dueDate: { type: Date, default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), required: true },
}, { timestamps: true });
module.exports = mongoose.model('Borrow', BorrowSchema);
