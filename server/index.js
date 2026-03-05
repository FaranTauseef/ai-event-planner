import express from "express";
import cors from "cors";
import pool from "../database/database_connection.js"
import jwt from "jsonwebtoken";




const app = express();
app.use(cors());
app.use(express.json());


// test DB
app.get("/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
