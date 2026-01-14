import { API_URL, authHeader } from "./config";

// ✅ REGISTER USER
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
      credentials: "include",
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("REGISTER BACKEND ERROR:", result);
    throw new Error(result.message);
  }

  return result;
};

// ✅ LOGIN USER


export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result; // must include token + user
};

