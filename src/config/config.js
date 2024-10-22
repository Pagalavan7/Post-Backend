import "dotenv/config";

export const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
};
