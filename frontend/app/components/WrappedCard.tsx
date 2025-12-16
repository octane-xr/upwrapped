'use client';

import { ReactNode } from 'react';

interface WrappedCardProps {
  children: ReactNode;
}

export default function WrappedCard({ children }: WrappedCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-2xl border border-white border-opacity-20 min-h-[600px] flex flex-col justify-center animate-slide-up">
      {children}
    </div>
  );
}

