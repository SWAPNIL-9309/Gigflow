import { useState, useContext } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await loginUser({ email, password });

      // 👉 Set minimal user info (cookie handles auth)
      setUser({ id: email, email });

      alert("Logged in successfully");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your GigFlow account"
    >
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-primary hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
