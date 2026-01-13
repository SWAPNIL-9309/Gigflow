import { API_URL } from "./config";

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

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
};

// ✅ LOGIN USER
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
};
