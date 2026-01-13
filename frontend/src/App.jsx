import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { socket } from "./socket/socket";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";

function AppContent() {
  const { user } = useContext(AuthContext);

  // Show register first for new users
  const [showRegister, setShowRegister] = useState(true);

  // App views after login
  const [view, setView] = useState("gigs"); 
  // views: "gigs" | "create-gig"

  // 🔔 Socket notifications
  useEffect(() => {
    if (!user) return;

    socket.emit("join", user.id || user.email);

    socket.on("hired", (data) => {
      alert(data.message);
    });

    return () => {
      socket.off("hired");
    };
  }, [user]);

  /* =========================
     AUTH FLOW
  ========================= */
  if (!user) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login onSwitch={() => setShowRegister(true)} />
    );
  }

  /* =========================
     APP FLOW (LOGGED IN)
  ========================= */
  if (view === "create-gig") {
    return (
      <CreateGig
        onSuccess={() => setView("gigs")}
      />
    );
  }

  return (
    <Gigs
      onCreateGig={() => setView("create-gig")}
    />
  );
}

/* =========================
   ROOT APP
========================= */
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
