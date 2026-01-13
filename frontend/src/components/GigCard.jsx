export default function GigCard({ gig, onView }) {
  return (
    <div className="bg-white p-5 rounded-lg border hover:shadow-sm transition">
      <h3 className="font-medium text-lg">{gig.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{gig.description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-medium">₹{gig.budget}</span>
        <button
          onClick={onView}
          className="text-sm text-primary hover:underline"
        >
          View
        </button>
      </div>
    </div>
  );
}
