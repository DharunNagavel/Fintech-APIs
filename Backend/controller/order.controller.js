import razorpay from "../config/razorpay.js";
import { pool } from "../db.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "txn_" + Date.now(),
    });

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

export const displayUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT firstname,mail, phone, fund_account FROM "user"',
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const payout = async (req, res) => {
  try {
    const { fund_account, amount } = req.body;

    const payout = await razorpay.payouts.create({
      account_number: "RkPTFI7RQtkTet",
      fund_account_id: fund_account,
      amount: amount * 100,
      currency: "INR",
      mode: "UPI",
      purpose: "payout",
    });

    res.json(payout);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Payout failed",
      error: error.message,
    });
  }
};
