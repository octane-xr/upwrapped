'use client';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Animated spinner */}
          <div className="w-24 h-24 border-8 border-purple-300 border-t-white rounded-full animate-spin mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Generando tu #UPWrapped
        </h2>
        
        <div className="space-y-2">
          <p className="text-purple-100 animate-pulse">
            Conectando con MyUP...
          </p>
          <p className="text-purple-200 text-sm">
            Esto puede tardar unos segundos
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

