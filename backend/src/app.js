const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const gigRoutes = require("./routes/gig.routes");
const bidRoutes = require("./routes/bid.routes");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

// 🔴 REQUIRED: parse JSON body
app.use(express.json());

// 🔴 REQUIRED: parse cookies
app.use(cookieParser());

// 🔴 REQUIRED: CORS with credentials
app.use(
  cors({
    origin: "gigflow-1.vercel.app",
    credentials: true
  })
);

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({ message: "GigFlow API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

/* =========================
   ERROR HANDLING (OPTIONAL)
========================= */

app.use((err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
