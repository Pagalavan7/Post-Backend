import * as userModel from "../models/user.model.js";

import { hashPassword } from "../utils/hashPassword.js";

export const singup = async (name, email, password) => {
  try {
    if (!(await userModel.findByEmail(email))) {
      console.log("Entering services, after checking email is present");
      const hashedPassword = await hashPassword(password);
      await userModel.save(name, email, hashedPassword);
    } else {
      throw new Error("User already found! Try signing in.");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
