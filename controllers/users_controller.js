import pool  from "../database/database_connection.js";

// GET all users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single user
export const getUserById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE user (for testing – later replaced by OAuth)
export const createUser = async (req, res) => {
  try {
    const { oauth_provider, oauth_id, name, email, role } = req.body;

    const result = await pool.query(
      `INSERT INTO users (oauth_provider, oauth_id, name, email, role)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [oauth_provider, oauth_id, name, email, role || "user"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name=$1, email=$2, role=$3
       WHERE id=$4
       RETURNING *`,
      [name, email, role, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
