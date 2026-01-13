const Bid = require("../models/Bid");
const Gig = require("../models/Gig");

/* =========================
   SUBMIT BID
========================= */
exports.submitBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    // Validation
    if (!gigId || !message || !price) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        message: "Gig not found"
      });
    }

    // ❌ Prevent bidding on own gig (FIXED FIELD NAME)
    if (gig.ownerId.toString() === req.user.id) {
      return res.status(403).json({
        message: "You cannot bid on your own gig"
      });
    }

    // ❌ Prevent bidding on closed gig
    if (gig.status !== "open") {
      return res.status(400).json({
        message: "Bidding is closed for this gig"
      });
    }

    // Optional: prevent duplicate bids by same freelancer
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user.id
    });

    if (existingBid) {
      return res.status(400).json({
        message: "You have already placed a bid on this gig"
      });
    }

    // Create bid
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price,
      status: "pending"
    });

    return res.status(201).json(bid);

  } catch (error) {
    console.error("SUBMIT BID ERROR:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   GET BIDS BY GIG
========================= */
exports.getBidsByGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    return res.json(bids);

  } catch (error) {
    console.error("GET BIDS ERROR:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   HIRE BID
========================= */
exports.hireBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({
        message: "Bid not found"
      });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({
        message: "Gig not found"
      });
    }

    // Only gig owner can hire
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to hire"
      });
    }

    // Update gig status
    gig.status = "assigned";
    await gig.save();

    // Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id },
      { status: "rejected" }
    );

    // Hire selected bid
    bid.status = "hired";
    await bid.save();

    return res.json({
      message: "Freelancer hired successfully"
    });

  } catch (error) {
    console.error("HIRE BID ERROR:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
