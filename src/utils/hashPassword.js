import "dotenv/config";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = process.env.SALT_ROUNDS;

  const hashedPassword = await bcrypt.hash(password, +saltRounds);

  return hashedPassword;
};

export const comparePassword = async (enteredPassword, storedHash) => {
  const match = await bcrypt.compare(enteredPassword, storedHash);
  return match;
};
