// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample data for friends and bills
let friends = [];
let bills = [];

// Routes
app.get('/friends', (req, res) => {
    res.json(friends);
});

app.post('/friends', (req, res) => {
    const { name } = req.body;
    friends.push({ id: friends.length + 1, name });
    res.status(201).send('Friend added successfully.');
});

app.get('/bills', (req, res) => {
    res.json(bills);
});

app.post('/bills', (req, res) => {
    const { payer, amount, description } = req.body;
    bills.push({ id: bills.length + 1, payer, amount, description });
    res.status(201).send('Bill added successfully.');
});

// Calculate split amounts
app.get('/split', (req, res) => {
    // Sample implementation, replace with actual splitting logic
    const totalAmount = bills.reduce((acc, curr) => acc + curr.amount, 0);
    const splitAmount = totalAmount / friends.length;
    res.json({ totalAmount, splitAmount });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
