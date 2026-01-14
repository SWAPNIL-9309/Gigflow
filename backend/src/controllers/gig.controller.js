const Gig = require("../models/Gig");

/* =========================
   CREATE GIG
========================= */

exports.createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id, // ✅ matches schema
      status: "open"
    });

    return res.status(201).json(gig);

  } catch (error) {
    console.error("CREATE GIG ERROR:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   GET ALL GIGS  ✅ REQUIRED
========================= */
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ status: "open" })
      .sort({ createdAt: -1 });

    return res.json(gigs);

  } catch (error) {
    console.error("GET GIGS ERROR:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
