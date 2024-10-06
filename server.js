const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3005;

// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // To handle JSON payloads

// File path for storing user data
const userDataFile = path.join(__dirname, 'user_data.json');

// Utility function to read users from JSON file
function readUsersFromFile() {
    try {
        const data = fs.readFileSync(userDataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];  // Return empty array if file doesn't exist or is empty
    }
}

// Utility function to write users to JSON file
function writeUsersToFile(users) {
    fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2), 'utf8');
}

// Serve index.html at the root ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.json({ message: 'Login successful!' });
    } else {
        res.status(400).json({ message: 'Invalid email or password.' });
    }
});

app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const users = readUsersFromFile();

    // Check if the user already exists by email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    // Add the new user to the user list
    const newUser = { name, email, password };
    users.push(newUser);

    // Write the updated user list back to the JSON file
    writeUsersToFile(users);

    res.json({ message: 'Registration successful!' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
