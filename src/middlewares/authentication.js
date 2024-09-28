import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);

      req.body.userName = user.userName;
      console.log("Auth success, going to next route");
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
