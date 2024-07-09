const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json("Test is working")
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body.formData;
        console.log(req.body, name, email, password)
        // Check name
        if (!name) {
            return res.json({ error: "Name is required" })
        }
        // Check Password
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and should be at least 6 characters" })
        }
        // Check Email
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({ error: "Email is taken already" })
        }

        const hahPassword = await hashPassword(password)

        const user = await User.create({ name, email, password: hahPassword })

        return res.json({ status: "Success", user: user });

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body.formData;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "No user found" })
        }

        const match = await comparePassword(password, user.password)
        if (match) {
            // res.json("Password match")
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if (!match) {
            return res.json({ error: "Password do not match" })
        }

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const getProfile = async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
            
        })
    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logout successful" });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}