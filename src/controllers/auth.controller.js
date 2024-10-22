import * as authService from "../services/auth.Service.js";

export const signup = async (req, res) => {
  console.log("coming to auth signup controller");

  try {
    const { userName, email, password } = req.body;

    console.log("data from postman", userName, email, password);

    await authService.singup(userName, email, password);
    res.status(201).send({ message: "User signup successful" });
  } catch (err) {
    res
      .status(400)
      .send({ message: "User signup error.", error: err.message || err });
  }
};

export const login = async (req, res) => {
  console.log("coming to auth login controller");
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ message: "User login successful", token: token });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error while logging in", error: err.message || err });
  }
};
