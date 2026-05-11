const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "",       
  database: "testdb"  
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// CREATE user
app.post("/api/l5", (req, res) => {
  db.query(
    "INSERT INTO l5 (name, email) VALUES (?, ?)",
    [req.body.name, req.body.email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User created successfully");
    }
  );
});

// READ users
app.get("/api/l5", (req, res) => {
  db.query("SELECT * FROM l5", (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

// UPDATE user
app.put("/api/l5/:id", (req, res) => {
  db.query(
    "UPDATE l5 SET name=?, email=? WHERE id=?",
    [req.body.name, req.body.email, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User updated successfully");
    }
  );
});

// DELETE user
app.delete("/api/l5/:id", (req, res) => {
  db.query("DELETE FROM l5 WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User deleted successfully");
  });
});

// FORM submission (Level Four)
app.post("/api/l4", (req, res) => {
  db.query(
    "INSERT INTO l4 (age, address) VALUES (?, ?)",
    [req.body.age, req.body.address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Data inserted successfully");
    }
  );
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
