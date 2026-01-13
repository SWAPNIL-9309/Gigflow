const Gig = require("../models/Gig");

/**
 * CREATE GIG (Client)
 * Protected route
 */
exports.createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET ALL OPEN GIGS
 * Public + searchable
 */
exports.getGigs = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {
      status: "open",
      ...(search && {
        title: { $regex: search, $options: "i" }
      })
    };

    const gigs = await Gig.find(filter).sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
