import mysql, { Pool } from 'mysql2/promise';

// Define a global object to hold the database pool to prevent multiple connections 
// during hot-reloading in development.
const globalForMySQL = global as unknown as { mysqlPool: Pool };

export const pool =
  globalForMySQL.mysqlPool ||
  mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_analytics',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

// Test the connection and log status
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log('[MySQL] Database connection successful.');
  } catch (err) {
    console.error('[MySQL] Database connection failed:', err);
  }
}

testConnection();

// In development, preserve the connection pool across hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalForMySQL.mysqlPool = pool;
}

export default pool;
