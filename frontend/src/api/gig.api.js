import { API_URL ,authHeader} from "./config";

/* =========================
   GET ALL GIGS  ✅ REQUIRED
========================= */
export const getAllGigs = async () => {
  const res = await fetch(`${API_URL}/api/gigs`, {
    credentials: "include"
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch gigs");
  }

  return result;
};

/* =========================
   CREATE GIG
========================= */


export const createGig = async (data) => {
  const res = await fetch(`${API_URL}/api/gigs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader() // 🔥 THIS IS THE KEY
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create gig");
  }

  return result;
};

