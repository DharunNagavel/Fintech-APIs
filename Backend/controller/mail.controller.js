import sendMail from "../sendmail.js";
export const sendOtp = async (req, res) => {
  const { mail } = req.body;
  const otp = Math.floor(10000 + Math.random() * 90000); 
  try {
    await sendMail(mail, otp);
    res.json({
      success: true,
      message: "OTP sent successfully",
      otp 
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send OTP"
    });
  }
};