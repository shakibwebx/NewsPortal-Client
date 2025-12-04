export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* News Portal Styled Spinner */}
        <div className="relative inline-flex items-center justify-center">
          {/* Outer rotating circle */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#D00614] rounded-full animate-spin"></div>

          {/* Inner pulsing dot */}
          <div className="absolute w-3 h-3 bg-[#D00614] rounded-full animate-pulse"></div>
        </div>

        {/* Loading text in Bengali */}
        <p className="mt-4 text-gray-600 font-medium" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
          লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}
