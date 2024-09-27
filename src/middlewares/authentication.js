import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded user is", user);
      req.body.userName = user.userName;
      next();
    } else {
      res
        .status(400)
        .json({ message: "Authorization header missing or malformed" });
    }
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid Token", error: err.message || err });
  }
};
