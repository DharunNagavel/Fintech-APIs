import nodemailer from "nodemailer";

const sendMail = async (mail, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dharunnagavel1226@gmail.com",
      pass: "lwtq pfvt apnx tkaw"
    }
  });

  const mailOptions = {
    from: "dharunnagavel1226@gmail.com",
    to: mail,
    subject: "OTP Verification",
    html: `
      <p>Your verification OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;