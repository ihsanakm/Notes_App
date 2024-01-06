const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
    try {
        // Get data from req
        const { email, password } = req.body;

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create user with the data
        const newUser = await User.create({ email, password: hashedPassword });
        res.json(newUser);
    } catch (error) {
        console.error('Error during signup:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).send('Internal Server Error');
    }
}

async function login(req, res) {
    try {
        // Get data from req
        const { email, password } = req.body;

        // Find the data from DB relevant to the req data
        const user = await User.findOne({ email });

        if (!user) {
            // User not found
            return res.status(401).json({ error: 'Invalid Email' });
        }

        // Compare found data password with req data password
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).json({ error: 'Invalid Password' });
        }

        // Create JWT
        const token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '5h' });

        // Set Cookie
        res.cookie('Authorization', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 3600000, sameSite: 'lax' }); // 1 hour

        // Send the token
        res.json({ token });
    } catch (error) {
        console.error('Error during Login:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function logout(req, res) {
    try {
        // Implementation for logout
        res.clearCookie('Authorization');
        res.sendStatus(200);
    } catch (error) {
        console.error('Error during Logout:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function checkAuth(req, res) {
    try {
        if (req.user) {
            // If the user is authenticated, you can send additional user data if needed
            res.status(200).json({ user: req.user });
        } else {
            // If the user is not authenticated
            res.sendStatus(401); // Unauthorized
        }
    } catch (error) {
        console.error('Error during Check Auth:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
};
