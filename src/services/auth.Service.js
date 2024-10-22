import * as userModel from "../models/user.model.js";
import * as jwtUtil from "../utils/jsonwebtoken.js";
import * as bcryptUtil from "../utils/hashPassword.js";

export const singup = async (name, email, password) => {
  console.log("inside signup service ", name, email, password);

  try {
    if (!(await userModel.findByEmail(email))) {
      const hashedPassword = await bcryptUtil.hashPassword(password);
      await userModel.save(name, email, hashedPassword);
    } else {
      throw new Error("User already found! Try signing in.");
    }
  } catch (err) {
    throw err;
  }
};

export const login = async (email, password) => {
  console.log("inside login service ");
  try {
    const user = await userModel.findByEmail(email);
    console.log("user received from findbyemail", user);
    if (!user) {
      throw new Error("User not found. Register your credentials!");
    } else if (!(await bcryptUtil.comparePassword(password, user.password))) {
      throw new Error("Incorrect Password! Try again with correct password");
    } else {
      const token = jwtUtil.generateToken({
        userName: user.userName,
        email: user.email,
      });
      return token;
    }
  } catch (err) {
    throw err;
  }
};
