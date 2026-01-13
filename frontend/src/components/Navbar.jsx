import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    alert("Logged out successfully");
  };

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">
            GigFlow
          </span>
          <span className="text-xs text-gray-400">
            Marketplace
          </span>
        </div>

        {/* Right side */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
