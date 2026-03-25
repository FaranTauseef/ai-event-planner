import pool  from "../database/database_connection.js";

export const getEvents = async (req,res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, location, start_date, end_date, owner_id } = req.body;

    const result = await pool.query(
      `INSERT INTO events (title, description, location, start_date, end_date, owner_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, description, location, start_date, end_date, owner_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, description, location, start_date, end_date } = req.body;

    const result = await pool.query(
      `UPDATE events
       SET title=$1, description=$2, location=$3, start_date=$4, end_date=$5
       WHERE id=$6
       RETURNING *`,
      [title, description, location, start_date, end_date, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
