// lib/db.js
import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0,
});

/**
 * Executes a SQL query using the connection pool.
 * @param {string} q - The SQL query.
 * @param {Array} values - The values to be escaped in the query.
 * @returns {Promise<Object>} - The result of the query.
 */
export async function query(q, values = []) {
  try {
    const [results] = await pool.query(q, values);
    return results;
  } catch (e) {
    console.error("Database query error:", e);
    throw new Error(e.message);
  }
}
