'use client';

import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

interface CursadasSlideProps {
  data: WrappedData;
  onNext: () => void;
}

export default function CursadasSlide({ data }: CursadasSlideProps) {
  const cursadas = data.yearStats.cursadasThisYear;

  const targetYear = data.yearStats.year;
  const aprobadas = data.lists.cursadas.filter(c => {
    const match = c.fecha.match(/\d{4}/);
    const year = match ? parseInt(match[0], 10) : 0;
    return year === targetYear && c.estado.toLowerCase().includes('aprobado');
  }).length;

  const getMessage = () => {
    if (aprobadas === cursadas && cursadas > 0) {
      return '¿No serás muy chupamedias? ';
    } else if (aprobadas > cursadas / 2) {
      return 'Buen promedio eh… podría ser peor ';
    } else if (aprobadas > 0) {
      return 'Nos pasa hasta a los mejores. Yo sé que podés más ';
    } else {
      return 'Lo importante es la intención. El año que viene la rompés ';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 sm:p-12 shadow-2xl border border-white border-opacity-20 min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 px-4"
      >
        Cursadas vs Aprobadas
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 w-full max-w-lg px-4">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-20 rounded-2xl p-4 sm:p-8 backdrop-blur-lg"
        >
          <div className="text-4xl sm:text-6xl font-bold text-white mb-2">{cursadas}</div>
          <div className="text-base sm:text-xl text-blue-100">Cursadas</div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white bg-opacity-20 rounded-2xl p-4 sm:p-8 backdrop-blur-lg"
        >
          <div className="text-4xl sm:text-6xl font-bold text-white mb-2">{aprobadas}</div>
          <div className="text-base sm:text-xl text-blue-100">Aprobadas</div>
        </motion.div>
      </div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-lg sm:text-2xl text-white font-medium max-w-lg px-4"
      >
        {getMessage()}
      </motion.p>
    </motion.div>
  );
}

