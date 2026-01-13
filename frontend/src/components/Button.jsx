export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition duration-200";

  const styles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    ghost: "border border-gray-300 text-gray-700 hover:bg-gray-100"
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
