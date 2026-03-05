import { pool } from "../db.js";
import razorpay from "../config/razorpay.js";
import { generateToken } from "../middleware/authMiddleware.js";

export const signin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await pool.query(
      'SELECT * FROM "user" WHERE mail=$1 AND password=$2',
      [mail, password],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const signup = async (req, res) => {
  try {

    const {
      firstname,
      lastname,
      mail,
      phone,
      dob,
      address,
      pan_number,
      password,
      account_number,
      ifsc
    } = req.body;

    if (!mail || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const existingUser = await pool.query(
      'SELECT * FROM "user" WHERE mail=$1',
      [mail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const existing = await razorpay.customers.all({
      contact: phone
    });

    console.log(existing);

    // 1️⃣ Create Razorpay Contact
    const customer = await razorpay.customers.create({
      name: `${firstname} ${lastname}`,
      email: mail,
      contact: phone,
      type: "customer"
    });

    const customer_id = customer.id;

    // 2️⃣ Create Fund Account
    const fundAccount = await razorpay.fundAccount.create({
      customer_id: customer_id,
      account_type: "bank_account",

      bank_account: {
        name: `${firstname} ${lastname}`,
        ifsc: ifsc,
        account_number: account_number
      }
    });

    const fund_account_id = fundAccount.id;

    // 3️⃣ Save user
    const result = await pool.query(
      `INSERT INTO "user"
      (firstname, lastname, mail, phone, dob, address, pan_number, password, account_number, ifsc, fund_account, customer_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *`,
      [
        firstname,
        lastname,
        mail,
        phone,
        dob,
        address,
        pan_number,
        password,
        account_number,
        ifsc,
        fund_account_id,
        customer_id
      ]
    );

    const user = result.rows[0];

    const token = generateToken(user);

    res.status(201).json({
      message: "Signup successful",
      user,
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};