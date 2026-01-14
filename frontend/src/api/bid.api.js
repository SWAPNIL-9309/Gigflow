import { API_URL } from "./config";


/* =========================
   SUBMIT BID
========================= */
export const submitBid = async (data) => {
  const res = await fetch(`${API_URL}/api/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to submit bid");
  }

  return result;
};

/* =========================
   GET BIDS BY GIG  ✅ REQUIRED
========================= */
export const getBidsByGig = async (gigId) => {
  const res = await fetch(`${API_URL}/api/bids/${gigId}`, {
    credentials: "include"
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch bids");
  }

  return result;
};

/* =========================
   HIRE BID
========================= */
export const hireBid = async (bidId) => {
  const res = await fetch(`${API_URL}/api/bids/${bidId}/hire`, {
    method: "PATCH",
    credentials: "include"
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to hire freelancer");
  }

  return result;
};
