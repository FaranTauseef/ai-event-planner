import pool  from "../database/database_connection.js";

export const getSchedules = async (req,res) => {
  try {
    const result = await pool.query("SELECT * FROM schedules ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM schedules WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScheduleByEventId = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM schedules WHERE event_id = $1",
      [req.query.event_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createSchedule = async (req, res) => {
  try {
    const { title, start_time, end_time, vendor_id, event_id } = req.body;

    const result = await pool.query(
      `INSERT INTO schedules (event_id, title, start_time, end_time, vendor_id)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [event_id, title, start_time, end_time, vendor_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { title, start_time, end_time, vendor_id, event_id } = req.body;

    const result = await pool.query(
      `UPDATE schedules
       SET title=$1, start_time=$2, end_time=$3, vendor_id=$4, event_id=$5
       WHERE id=$6
       RETURNING *`,
      [title, start_time, end_time, vendor_id, event_id, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
     
export const deleteSchedule = async (req, res) => {
  try {
    await pool.query("DELETE FROM schedules WHERE id = $1", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
