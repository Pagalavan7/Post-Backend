import pool from "../config/db.js";

export const save = async function (userName, email, password) {
  console.log("inside user model create user", userName, email, password);
  const query =
    'INSERT INTO "users" ("userName", "email", "password") VALUES ($1, $2, $3) RETURNING *';
  const values = [userName, email, password];

  try {
    const res = await pool.query(query, values);
    console.log(res, "is result");
    return res.rows[0];
  } catch (err) {
    console.log("error is coming here", err);
    throw err;
  }
};

export const findByEmail = async function (email) {
  console.log("inside findby email user model ");
  try {
    const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [
      email,
    ]); // Use $1 for parameterized query
    console.log("result of findby email", result);
    return result.rows[0]; // Return the first user found, or undefined if no users match
  } catch (err) {
    throw err; // Maintain original error handling
  }
};
