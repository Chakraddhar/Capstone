// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("username",username);
    console.log("email",email);
    console.log("password",password);
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("username",username);
    console.log("email",email);
    console.log("password",password);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email",email);
    console.log("password",password);

    const user = await User.findOne({ email });
    console.log("email",email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    console.log("email",email);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("password",password);
    console.log("Stored hash:", user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
