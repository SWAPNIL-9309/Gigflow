export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
