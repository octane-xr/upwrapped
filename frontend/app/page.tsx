'use client';

import { useState } from 'react';
import LoginForm from './components/LoginForm';
import WrappedCarousel from './components/WrappedCarousel';
import LoadingScreen from './components/LoadingScreen';
import { generateWrapped, type WrappedData } from './services/api';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);

  const handleGenerateWrapped = async (username: string, password: string, year: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateWrapped(username, password, year);
      setWrappedData(data);
    } catch (err: any) {
      setError(err.message || 'Error al generar tu wrapped. Por favor, intentá de nuevo.');
      console.error('Error generating wrapped:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWrappedData(null);
    setError(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (wrappedData) {
    return <WrappedCarousel data={wrappedData} onReset={handleReset} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-3xl sm:text-4xl font-bold">UP</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
              #UPWrapped
            </h1>
            <p className="text-base sm:text-xl text-purple-100 mb-2 px-4">
              Descubrí tu año académico al estilo Spotify Wrapped
            </p>
            <p className="text-xs sm:text-sm text-purple-200">
              Universidad de Palermo
            </p>
          </div>

          {/* Login Form */}
          <LoginForm onSubmit={handleGenerateWrapped} />

          {/* Error Message */}
          {error && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-500 bg-opacity-20 border border-red-300 rounded-lg animate-slide-up mx-2 sm:mx-0">
              <p className="text-white text-center text-sm sm:text-base">{error}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg border border-white border-opacity-20 mx-2 sm:mx-0">
            <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">️ Importante</h3>
            <ul className="text-purple-100 text-xs sm:text-sm space-y-1">
              <li>• No afiliado a la Universidad de Palermo</li>
              <li>• Tus credenciales no se guardan ni persisten</li>
              <li>• Usalo bajo tu propia responsabilidad</li>
              <li>• Los datos se obtienen directamente de MyUP</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

