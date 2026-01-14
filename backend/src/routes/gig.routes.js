const express = require("express");
const router = express.Router();

const {
  createGig,
  getAllGigs
} = require("../controllers/gig.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createGig);
router.get("/", authMiddleware, getAllGigs);

module.exports = router;
