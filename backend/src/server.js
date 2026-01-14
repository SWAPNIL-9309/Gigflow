const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const gigRoutes = require("./routes/gig.routes");
const bidRoutes = require("./routes/bid.routes");

const app = express();

/* =========================
   MIDDLEWARE (ORDER MATTERS)
========================= */
app.use(express.json());
app.use(cookieParser()); // 🔥 MUST COME BEFORE ROUTES
app.use(
  cors({
    origin: "gigflow-1.vercel.app",
    credentials: true
  })
);

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);


app.get("/", (req, res) => {
  res.send("API running");
});


