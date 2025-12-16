'use client';

import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string, year: number) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onSubmit(username, password, currentYear);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-white border-opacity-20 shadow-2xl animate-slide-up mx-2 sm:mx-0">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="username" className="block text-white font-medium mb-2 text-sm sm:text-base">
            Usuario MyUP
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            placeholder="Tu usuario"
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-white font-medium mb-2 text-sm sm:text-base">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            placeholder="Tu contraseña"
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-purple-700 font-bold py-3 sm:py-4 text-sm sm:text-base rounded-lg hover:bg-purple-50 transition-colors duration-200 transform hover:scale-105 active:scale-95"
        >
          Generar #UPWrapped
        </button>
      </form>
    </div>
  );
}

