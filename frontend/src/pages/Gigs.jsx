import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import GigCard from "../components/GigCard";
import GigDetails from "./GigDetails";
import { getAllGigs } from "../api/gig.api";

export default function Gigs({ onCreateGig }) {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGig, setSelectedGig] = useState(null);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const data = await getAllGigs();
      setGigs(data);
    } catch (error) {
      alert("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  // 👉 Show Gig Details when View is clicked
  if (selectedGig) {
    return (
      <GigDetails
        gig={selectedGig}
        onBack={() => setSelectedGig(null)}
      />
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Open Gigs
            </h1>
            <p className="text-sm text-gray-500">
              Browse projects posted by clients
            </p>
          </div>

          <Button onClick={onCreateGig}>
            Create Gig
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading gigs...
          </p>
        ) : gigs.length === 0 ? (
          <p className="text-sm text-gray-500">
            No gigs available at the moment.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gigs.map(gig => (
              <GigCard
                key={gig._id}
                gig={gig}
                onView={() => setSelectedGig(gig)} // ✅ FIXED
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
