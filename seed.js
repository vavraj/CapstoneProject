const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const User = require('./models/User');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Seed Data
const seedBooks = [
    { name: 'Book A', author: 'Author 1', genre: 'Fiction', available: true },
    { name: 'Book B', author: 'Author 2', genre: 'Non-Fiction', available: true },
    { name: 'Book C', author: 'Author 3', genre: 'Fantasy', available: true },
    { name: 'Book D', author: 'Author 4', genre: 'Science', available: true },
    { name: 'Book E', author: 'Author 5', genre: 'Biography', available: true },
];

const seedUsers = [
    { name: 'Admin User', username: 'admin', password: 'admin123', email: 'admin@example.com', mobile: '1234567890', admin: true },
    { name: 'User One', username: 'user1', password: 'password1', email: 'user1@example.com', mobile: '1111111111', admin: false },
    { name: 'User Two', username: 'user2', password: 'password2', email: 'user2@example.com', mobile: '2222222222', admin: false },
    { name: 'User Three', username: 'user3', password: 'password3', email: 'user3@example.com', mobile: '3333333333', admin: false },
    { name: 'User Four', username: 'user4', password: 'password4', email: 'user4@example.com', mobile: '4444444444', admin: false },
];

// Insert Data
const seedDatabase = async () => {
    try {
        await Book.deleteMany();
        await User.deleteMany();

        // Hash passwords for users
        const bcrypt = require('bcryptjs');
        for (let user of seedUsers) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        await Book.insertMany(seedBooks);
        await User.insertMany(seedUsers);

        console.log('Database seeded successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDatabase();
