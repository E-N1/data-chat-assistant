export default function LoadingChat() {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="text-lg font-semibold text-gray-700">Neuer Chat wird erstellt</div>
        <div className="flex space-x-2">
          <span className="dot animate-ping bg-blue-500 rounded-full w-3 h-3"></span>
          <span className="dot animate-ping animation-delay-200 bg-blue-500 rounded-full w-3 h-3"></span>
          <span className="dot animate-ping animation-delay-400 bg-blue-500 rounded-full w-3 h-3"></span>
        </div>
      </div>
    );
  }
  