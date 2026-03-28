import pool from "../database/database_connection.js";

export const getEventGuests = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query("SELECT * FROM event_guests WHERE user_id = $1 ORDER BY id DESC", [user_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventGuestById = async (req, res) => {
  try {
    const user_id = req.user.id;
    

     const result = await pool.query(
      "SELECT * FROM event_guests WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEventGuest = async (req, res) => {
  try {
    const { name, event_id, rsvp_status, preferences } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO event_guests (name, event_id, user_id, rsvp_status, preferences)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [name, event_id, user_id, rsvp_status, preferences]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEventGuest = async (req, res) => {
  try {
    const { name, rsvp_status, preferences } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      `UPDATE event_guests
       SET name=$1, rsvp_status=$2, preferences=$3
       WHERE id=$4 AND user_id=$5
       RETURNING *`,
      [name, rsvp_status, preferences, req.params.id, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEventGuest = async (req, res) => {
  try {
    const user_id = req.user.id;
    await pool.query(
      "DELETE FROM event_guests WHERE id = $1 AND user_id = $2",
      [req.params.id, user_id]
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
