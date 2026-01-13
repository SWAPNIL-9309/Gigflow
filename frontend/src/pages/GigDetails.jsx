import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import BidCard from "../components/BidCard";

import { submitBid, getBidsByGig, hireBid } from "../api/bid.api";
import { AuthContext } from "../context/AuthContext";

export default function GigDetails({ gig, onBack }) {
  const { user } = useContext(AuthContext);

  // ✅ FIX: bids state was missing
  const [bids, setBids] = useState([]);

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [hiring, setHiring] = useState(false);

  /* =========================
     FETCH BIDS (CLIENT VIEW)
  ========================= */
  useEffect(() => {
    getBidsByGig(gig._id)
      .then(setBids)
      .catch(() => {});
  }, [gig._id]);

  /* =========================
     CAN USER BID?
  ========================= */
  const canBid =
    user &&
    gig.status === "open" &&
    gig.clientId !== user.id;

  /* =========================
     SUBMIT BID
  ========================= */
  const handleBid = async () => {
    if (!message || !price) {
      alert("Message and price required");
      return;
    }

    setLoading(true);
    try {
      await submitBid({
        gigId: gig._id,
        message,
        price
      });

      alert("Bid submitted successfully");
      setMessage("");
      setPrice("");

      // refresh bids
      const updated = await getBidsByGig(gig._id);
      setBids(updated);
    } catch {
      alert("Failed to submit bid");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     HIRE FREELANCER (CLIENT)
  ========================= */
  const handleHire = async (bidId) => {
    setHiring(true);
    try {
      await hireBid(bidId);

      gig.status = "assigned"; // local update

      const updatedBids = await getBidsByGig(gig._id);
      setBids(updatedBids);

      alert("Freelancer hired");
    } finally {
      setHiring(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:underline mb-4"
        >
          ← Back to gigs
        </button>

        {/* GIG INFO */}
        <section className="bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {gig.title}
            </h1>

            <span
              className={`text-sm font-medium px-3 py-1 rounded-full
                ${
                  gig.status === "assigned"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }
              `}
            >
              {gig.status === "assigned" ? "Assigned" : "Open"}
            </span>
          </div>

          <p className="mt-3 text-gray-600">
            {gig.description}
          </p>

          <div className="mt-3 text-sm font-medium">
            Budget: ₹{gig.budget}
          </div>
        </section>

        {/* BID FORM (FREELANCER) */}
        {canBid && (
          <section className="mt-8 bg-white border rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">
              Submit a proposal
            </h2>

            <div className="space-y-4">
              <Input
                label="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />

              <Input
                label="Proposed price (₹)"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />

              <Button onClick={handleBid}>
                {loading ? "Submitting..." : "Submit Bid"}
              </Button>
            </div>
          </section>
        )}

        {/* CLIENT VIEW: BIDS */}
        {bids.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium mb-4">
              Received bids
            </h2>

            <div className="space-y-4">
              {bids.map(bid => (
                <BidCard
  key={bid._id}
  bid={bid}
  onHire={() => handleHire(bid._id)}
  disabled={gig.status === "assigned" || hiring}
/>

              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
