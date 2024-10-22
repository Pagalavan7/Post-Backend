import pool from "../config/db.js"; // Import the PostgreSQL database connection

export const getAllPosts = async () => {
  console.log("get all posts model");

  try {
    const result = await pool.query(`SELECT * FROM posts ORDER BY id DESC`);

    console.log(result);

    return result.rows; // PostgreSQL returns results in 'rows' property
  } catch (err) {
    throw err.message || err; // Maintain original error handling
  }
};

export const getPostById = async (id) => {
  console.log("get  post by id model");
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]); // Use $1 for parameterized query
    console.log(result);
    if (result.rows[0]) {
      console.log(result);
      return result.rows[0];
    } // Return the post if found
    else throw new Error("Id not found!");
  } catch (err) {
    throw err.message || err;
  }
};

export const savePost = async (title, username, body) => {
  console.log("save one post model", title, username, body);
  try {
    await pool.query(
      `INSERT INTO "posts" ("title", "body", "userName") VALUES ($1, $2, $3)`,
      [title, body, username] // Use an array to pass parameters
    );
  } catch (err) {
    console.log(err);
    throw err.message || err;
  }
};

export const editPost = async (id, title, body, modifiedOn) => {
  console.log("edit  posts model");

  try {
    const result = await pool.query(
      `UPDATE posts SET title = $1, body = $2, modifiedOn = $3 WHERE id = $4`,
      [title, body, modifiedOn, id] // Use an array to pass parameters
    );
    console.log(result);
    const status = result.rowCount ? true : false; // Check if any rows were affected
    console.log(status);

    if (!status)
      throw new Error("No post with such id found. Cannot update post!");
  } catch (err) {
    throw err.message || err;
  }
};

export const deletePost = async (id) => {
  console.log("delete posts model");
  try {
    const result = await pool.query(`DELETE FROM posts WHERE id = $1`, [id]); // Use parameterized query
  } catch (err) {
    throw err.message || err;
  }
};

export const deleteAllPosts = async () => {
  console.log("delete all posts model");
  try {
    await pool.query(`TRUNCATE TABLE posts`); // Truncate table to remove all posts
  } catch (err) {
    throw err.message || err;
  }
};
