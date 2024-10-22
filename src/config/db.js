import pkg from "pg"; // Import the default package
const { Pool } = pkg;
import { config } from "./config.js";

const pool = new Pool(config);

export const connectDB = async () => {
  try {
    // Test the connection
    await pool.connect();
    console.log("PostgreSQL DB connection successful");
  } catch (err) {
    console.log("PostgreSQL DB connection failed with error: " + err);
    throw err;
  }
};
export default pool;
