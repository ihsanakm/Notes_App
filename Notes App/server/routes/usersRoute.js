const User = require('../model/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { now } = require('mongoose');


async function signup(req, res) {
    try {
        // Get data from req
        const { email, password } = req.body;

        //hash password
        var hashedpassword = bcrypt.hashSync(password, 8);


        // Create user with the data
        const newUser = await User.create({ email:email, password:hashedpassword });
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
        const user = await User.findOne({ email: email });
        
        if (!user) {
            // User not found
            return res.status(401).json({ error: 'Invalid Invalid Email' });
        }

        // Compare found data password with req data password
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).json({ error: 'Invalid Passowrd' });
        }

        // Create JWT
        const token = jwt.sign({
            sub: user._id
        }, process.env.SECRET, { expiresIn: '5h' });

        // Set Cookie
        res.cookie('authorization', token, {
            expires: new Date(Date.now() + 90000000000),
            httpOnly: true,
        });

        // Send the token
        res.json({ token });
    } catch (error) {
        console.error('Error during Login:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function logout(req, res) {
    // Implementation for logout
    res.clearCookie("autherization")
    res.sendStatus(200)
}

function checkAuth(req, res) {
    console.log(req.user)
    res.sendStatus(200)
}

module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    checkAuth: checkAuth
};
