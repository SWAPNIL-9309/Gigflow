export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
        {...props}
      />
    </div>
  );
}
