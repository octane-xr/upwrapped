'use client';
import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

export default function ProgressSlide({ data }: { data: WrappedData; onNext: () => void }) {
  const pct = data.summary.avanceCarreraPct;
  const getMessage = () => {
    if (pct >= 100) return '\n\nFELICIDADES, TE RECIBISTE\nTodo valió la pena';
    if (pct >= 75) return 'Tres cuartos adentro. Recta final ';
    if (pct >= 50) return '¿Mitad de carrera? No lo puedo creer ';
    if (pct >= 25) return 'Ya vamos un cuarto de la carrera… cómo pasa el tiempo ';
    return 'Recién estamos empezando, pero vamos excelente ';
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 sm:p-12 shadow-2xl min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 px-4">Avance de Carrera</h2>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6 sm:mb-8"><div className="text-6xl sm:text-8xl font-bold text-white mb-2">{pct.toFixed(1)}%</div></motion.div>
      <div className="w-full max-w-md h-3 sm:h-4 bg-white bg-opacity-20 rounded-full overflow-hidden mb-6 sm:mb-8 mx-4">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 2, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-green-400 to-emerald-500" />
      </div>
      <p className="text-base sm:text-2xl text-purple-100 whitespace-pre-line max-w-lg px-4">{getMessage()}</p>
    </motion.div>
  );
}
