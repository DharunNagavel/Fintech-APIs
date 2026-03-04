import { Router } from "express";
import { sendOtp } from "../controller/mail.controller.js";

const mailrouter = Router();

mailrouter.post("/send-otp", sendOtp);

export default mailrouter;