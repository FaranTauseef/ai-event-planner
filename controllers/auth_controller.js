import pool from "../database/database_connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1,$2,$3)
       RETURNING id,name,email`,
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// VERIFY TOKEN / CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await pool.query(
      "SELECT id,name,email FROM users WHERE id = $1",
      [decoded.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authSuccess = async (req, res) => {
  try {

    const user = req.user;

    const token = jwt.sign(
      { id: user.id, email: user.email , role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.redirect(`http://localhost:5173/login?token=${token}`);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

