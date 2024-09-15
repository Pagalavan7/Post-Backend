import "dotenv/config";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = process.env.SALT_ROUNDS;
  console.log(saltRounds);
  const hashedPassword = await bcrypt.hash(password, +saltRounds);
  console.log("Hashed Password:", hashedPassword);
  return hashedPassword;
};
