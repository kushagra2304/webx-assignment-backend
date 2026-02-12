const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.register = async (req, res, next) => {
    try {
        const { fullName, email, contactNumber, username, password, role } = req.body;

        const existingUser = await User.findOne({
            where: { [Op.or]: [{ email }, { username }] }
        });

        if (existingUser)
            return res.status(400).json({ message: "Email or Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            contactNumber,
            username,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        if (!user)
            return res.status(400).json({ message: "Invalid Credentials" });

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};
