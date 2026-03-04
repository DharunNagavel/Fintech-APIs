import { Router } from "express";
import { signin, signup } from "../controller/auth.controller.js";

export const authrouter = Router();

authrouter.post("/signin", signin);
authrouter.post("/signup", signup);