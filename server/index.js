import express from "express";
import cors from "cors";
import pool from "../database/database_connection.js"
import jwt from "jsonwebtoken";
import session from "express-session";
import passport from "passport";

import taskRoutes from "../routes/tasks_routes.js";
import eventRoutes from "../routes/events_routes.js";
import eventGuestRoutes from "../routes/event_guests_routes.js";
import userRoutes from "../routes/users_routes.js";
import vendorRoutes from "../routes/vendors_routes.js";
import scheduleRoutes from "../routes/schedules_routes.js";
import authRoutes from "../routes/auth_routes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "oauth_session",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// test DB
// app.get("/db-test", async (req, res) => {
//   const result = await pool.query("SELECT NOW()");
//   res.json(result.rows);
// });

app.use("/api/tasks", taskRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/guests", eventGuestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
