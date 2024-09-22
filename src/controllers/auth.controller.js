import * as authService from "../services/auth.Service.js";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    await authService.singup(userName, email, password);
    res.status(201).send({ message: "User signup successful" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "User signup error.", error: err.message || err });
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
