import Cred from "../Model/user.js";   // ✅ match the export
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const generateToken = (id) => jwt.sign({ id }, process.env.JSON_WEB, { expiresIn: "1h" });

// SIGNUP
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existsUser = await Cred.findOne({ email });
    if (existsUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Cred({ name, email, password: hashedPassword });
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jwt: generateToken(user._id),
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Cred.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jwt: generateToken(user._id),
      message: "Login successful",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};