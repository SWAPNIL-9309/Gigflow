const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { createGig, getGigs } = require("../controllers/gig.controller");

router.post("/", auth, createGig);
router.get("/", getGigs);

module.exports = router;
