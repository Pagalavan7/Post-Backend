import { validationResult } from "express-validator";
import * as authService from "../services/auth.Service.js";

export const signup = async (req, res) => {
  try {
    console.log("entering controller");
    const errors = validationResult(req);
    console.log("Error while validation: ", errors.array());
    if (errors.isEmpty()) {
      console.log("Entering service..");
      const { name, email, password } = req.body;
      await authService.singup(name, email, password);
      res.status(201).send({ message: "User signup successful" });
    } else {
      const errMessage = errors.array()[0].msg;
      throw new Error(errMessage);
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "User signup error.", err: err.message || err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ message: "User login successful", token: token });
  } catch (err) {
    console.log(err.message || err);
    res
      .status(400)
      .send({ message: "Error while logging in", error: err.message || err });
  }
};
