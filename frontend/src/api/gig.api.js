import { API_URL } from "./config";

/* =========================
   GET ALL GIGS
========================= */
export const getAllGigs = async () => {
  const res = await fetch(`${API_URL}/api/gigs`, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch gigs");
  }

  return res.json();
};

/* =========================
   CREATE GIG  ✅ REQUIRED
========================= */
export const createGig = async (data) => {
  const res = await fetch(`${API_URL}/api/gigs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create gig");
  }

  return res.json();
};
