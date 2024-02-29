const { User } = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            // done: check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                //Todo: generate token
                const token = generateToken({ id: user._id, email: user.email, role: "admin" });
                return res.send({ user, token });
            }
            return res.status(401).send("Email or password are incorrect");
        };
        return res.status(401).send("Email or password are incorrect");
    } catch (error) {
        return res.status(400).send("Error");
    }
}

const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        // Todo:  encrypt password
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hash, fullName });
        console.log(user);
        user.id = user._id;
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send("Error");
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const isDeleted = await User.findByIdAndDelete(id);
        if (isDeleted) {
            return res.send("Deleted successfully");
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        res.status(400).send("Error");
    }
}

const updateUser = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });
        // const user = await User.updateOne({ email: "rrr@g.com" }, body, { new: true });
        return res.send(user);
    } catch (error) {
        res.status(400).send("Error");
    }
}

module.exports = { login, register, updateUser, deleteUser, getUsers };