import pool  from "../database/database_connection.js";

export const getVendors = async (req,res) => {
  try {
    const result = await pool.query("SELECT * FROM vendors ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vendors WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createVendor = async (req, res) => {
  try {
    const { name, service_type, contact_info, cost } = req.body;

    const result = await pool.query(
      `INSERT INTO vendors (name, service_type, contact_info, cost)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [name, service_type, contact_info, cost]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { name, service_type, contact_info, cost } = req.body;

    const result = await pool.query(
      `UPDATE vendors
       SET name=$1, service_type=$2, contact_info=$3, cost=$4
       WHERE id=$5
       RETURNING *`,
      [name, service_type, contact_info, cost, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    await pool.query("DELETE FROM vendors WHERE id = $1", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
