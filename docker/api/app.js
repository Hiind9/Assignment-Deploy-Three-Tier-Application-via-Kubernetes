const express = require('express');
const cors = require("cors");
const { connectDB, sql } = require("./config/db.config");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Create users table if it doesn't exist
async function initializeDB() {
  try {
    const pool = await connectDB();
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
      CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        age INT,
        address VARCHAR(255)
      );
    `);
    console.log("Database initialized");
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
}

// GET all users
app.get("/api/user", async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM users");
    res.json(result.recordset );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user
app.post("/api/user", async (req, res) => {
  try {
    const { name, email, age, address } = req.body;

    // Input validation
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const pool = await connectDB();
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("age", sql.Int, age)
      .input("address", sql.VarChar, address).query(`
        INSERT INTO users (name, email, age, address)
        VALUES (@name, @email, @age, @address);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      message: "User created successfully",
      userId: result.recordset[0].id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user
app.put("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const pool = await connectDB();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("age", sql.Int, age)
      .input("address", sql.VarChar, address).query(`
        UPDATE users
        SET name = @name,
            email = @email,
            age = @age,
            address = @address
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
app.delete("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await connectDB();
    const result = await pool.request().input("id", sql.Int, id).query(`
        DELETE FROM users
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeDB();
});
