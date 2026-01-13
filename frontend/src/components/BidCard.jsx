
import Button from "./Button";

export default function BidCard({ bid, onHire, disabled }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-900">
          {bid.freelancerId?.name || "Freelancer"}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          {bid.message}
        </p>

        <p className="text-sm font-medium mt-2">
          ₹{bid.price}
        </p>

        <span
          className={`text-xs mt-1 inline-block
            ${
              bid.status === "hired"
                ? "text-green-600"
                : bid.status === "rejected"
                ? "text-red-500"
                : "text-gray-500"
            }
          `}
        >
          {bid.status}
        </span>
      </div>

      {/* ✅ Hire Button */}
      {bid.status === "pending" && (
        <Button
          onClick={onHire}
          disabled={disabled}
        >
          Hire
        </Button>
      )}
    </div>
  );
}
