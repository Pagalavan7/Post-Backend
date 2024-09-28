import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  console.log(secretKey);
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return err.message || err;
  }
};
