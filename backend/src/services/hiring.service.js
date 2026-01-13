const mongoose = require("mongoose");
const Gig = require("../models/Gig");
const Bid = require("../models/Bid");
const socket = require("../config/socket");

exports.hireFreelancer = async (bidId, clientId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = await Gig.findOne({
      _id: bid.gigId,
      ownerId: clientId,
      status: "open"
    }).session(session);

    if (!gig) {
      throw new Error("Gig already assigned or unauthorized");
    }

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // 🔔 REAL-TIME NOTIFICATION
    socket.getIO()
      .to(bid.freelancerId.toString())
      .emit("hired", {
        message: `🎉 You have been hired for "${gig.title}"`
      });

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
