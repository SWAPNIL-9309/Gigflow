import { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { createGig } from "../api/gig.api";

export default function CreateGig({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateGig = async () => {
    if (!title || !description || !budget) {
      alert("All fields are required");
      return;
    }

    const parsedBudget = Number(budget);

    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      alert("Budget must be a valid number");
      return;
    }

    setLoading(true);
    try {
      await createGig({
        title: title.trim(),
        description: description.trim(),
        budget: parsedBudget // ✅ FIXED
      });

      alert("Gig created successfully");

      setTitle("");
      setDescription("");
      setBudget("");

      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create a new gig
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Describe your project and set a budget
          </p>

          <div className="mt-6 space-y-4">
            <Input
              label="Gig title"
              placeholder="e.g. Build a React dashboard"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows="5"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Explain your project requirements clearly"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <Input
              label="Budget (₹)"
              type="number"
              placeholder="e.g. 5000"
              value={budget}
              onChange={e => setBudget(e.target.value)}
            />

            <Button onClick={handleCreateGig} disabled={loading}>
              {loading ? "Creating..." : "Create gig"}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
