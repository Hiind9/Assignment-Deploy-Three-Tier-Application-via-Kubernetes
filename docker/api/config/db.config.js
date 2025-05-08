const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to Azure SQL Database');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

module.exports = { connectDB, sql }; 