const express = require("express");
const router = express.Router();
const { login, register, updateUser, deleteUser, getUsers } = require("../controllers/users.controller");
const { auth, authorize } = require("../middlewares/auth");
const { User } = require("../models/users.model");

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.patch("/:id", auth, authorize(["employee", "admin"]), updateUser)
router.delete("/:id", auth, authorize(["admin"]), deleteUser);

router.get("/init-user", auth, async (req, res) => {
    const user = req.user;
    try {
        const dbUser = await User.findById(user.id);
        res.send(dbUser);
    } catch (error) { }
});


module.exports = router;