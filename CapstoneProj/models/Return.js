const mongoose = require('mongoose');
const ReturnSchema = new mongoose.Schema({
    username: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', unique: true },
    dueDate: { type: Date, required: true },
    fineAmount: { type: Number },
}, { timestamps: true });
module.exports = mongoose.model('Return', ReturnSchema);
