import * as userModel from "../models/user.model.js";
import * as jwtUtil from "../utils/jsonwebtoken.js";
import * as bcryptUtil from "../utils/hashPassword.js";

export const singup = async (name, email, password) => {
  try {
    if (!(await userModel.findByEmail(email))) {
      console.log("Entering services, after checking email is present");
      const hashedPassword = await bcryptUtil.hashPassword(password);
      await userModel.save(name, email, hashedPassword);
    } else {
      throw new Error("User already found! Try signing in.");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    const user = await userModel.findByEmail(email);
    console.log("user from findbyemail", user);
    if (user && (await bcryptUtil.comparePassword(password, user.password))) {
      console.log("entered to create jwt..");
      const payload = {
        userName: user.userName,
        email: user.email,
        role: user.role,
      };
      const token = await jwtUtil.generateToken(payload);
      return token;
    } else {
      throw new Error("User not found! Sign up.");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
