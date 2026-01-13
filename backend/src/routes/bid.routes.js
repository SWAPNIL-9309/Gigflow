const express = require("express");
const router = express.Router();

const {
  submitBid,
  getBidsByGig,
  hireBid
} = require("../controllers/bid.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🧪 DEBUG (TEMPORARY)
console.log("SUBMIT BID TYPE:", typeof submitBid);
console.log("GET BIDS TYPE:", typeof getBidsByGig);
console.log("HIRE BID TYPE:", typeof hireBid);

router.post("/", authMiddleware, submitBid);
router.get("/:gigId", authMiddleware, getBidsByGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);

module.exports = router;
