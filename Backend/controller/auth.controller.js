import { pool } from '../db.js';
import { generateToken } from '../middleware/authMiddleware.js';

export const signin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    
    if (!mail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await pool.query('SELECT * FROM "user" WHERE mail=$1 AND password=$2',[mail, password]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: user,
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, mail, phone, dob, address, pan_number,password } = req.body;
    
    if (!mail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const existingUser = await pool.query('SELECT * FROM "user" WHERE mail=$1', [mail]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const result = await pool.query(
      'INSERT INTO "user" (firstname, lastname, mail, phone, dob, address, pan_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [firstname, lastname, mail, phone, dob, address, pan_number, password]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      message: "Signup successful",
      user: user,
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};