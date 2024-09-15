import { body } from "express-validator";

export const validateUser = [
  body("name").trim().not().isEmpty(),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password").trim().isLength({ min: 6 }),
];
