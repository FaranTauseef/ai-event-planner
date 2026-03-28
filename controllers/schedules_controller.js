import pool  from "../database/database_connection.js";

export const getSchedules = async (req,res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query("SELECT * FROM schedules WHERE user_id = $1 ORDER BY id DESC", [user_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      "SELECT * FROM schedules WHERE id = $1 AND user_id = $2",
      [req.params.id, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScheduleByEventId = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      "SELECT * FROM schedules WHERE event_id = $1 AND user_id = $2",
      [req.query.event_id, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createSchedule = async (req, res) => {
  try {
    const { title, start_time, end_time, vendor_id, event_id, task_id } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO schedules (user_id, event_id, title, start_time, end_time, vendor_id, task_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [user_id, event_id, title, start_time, end_time, vendor_id, task_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { title, start_time, end_time, vendor_id, event_id, task_id } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      `UPDATE schedules
       SET title=$1, start_time=$2, end_time=$3, vendor_id=$4, event_id=$5, task_id=$6
       WHERE id=$7 AND user_id=$8
       RETURNING *`,
      [title, start_time, end_time, vendor_id, event_id, task_id, req.params.id, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
     
export const deleteSchedule = async (req, res) => {
  try {
    const user_id = req.user.id;
    await pool.query("DELETE FROM schedules WHERE id = $1 AND user_id = $2", [req.params.id, user_id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
