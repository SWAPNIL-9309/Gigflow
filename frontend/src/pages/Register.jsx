import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser } from "../api/auth.api";

export default function Register({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await registerUser({ name, email, password });

      alert("Account created successfully. Please login.");
      onSwitch(); // 👉 move to Login page
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join GigFlow to post gigs or bid on projects"
    >
      <div className="space-y-4">
        <Input
          label="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

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

        <Button onClick={handleRegister}>
          {loading ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-primary hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
