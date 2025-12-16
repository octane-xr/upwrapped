'use client';

import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

interface FinalesSlideProps {
  data: WrappedData;
  onNext: () => void;
}

export default function FinalesSlide({ data }: FinalesSlideProps) {
  const finalesTotal = data.yearStats.finalesThisYear;
  const finalesAprobados = data.yearStats.finalesAprobadosThisYear;

  const getMessage = () => {
    if (finalesAprobados === finalesTotal && finalesTotal > 0) {
      return '¡Todos aprobados! ';
    } else if (finalesAprobados > finalesTotal / 2) {
      return 'Más de la mitad aprobados. Nada mal ';
    } else if (finalesAprobados > 0) {
      return 'Algunos los pasaste, eso cuenta ';
    } else {
      return 'Los finales son difíciles. La próxima sale mejor ';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 sm:p-12 shadow-2xl border border-white border-opacity-20 min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 px-4"
      >
        Finales Rendidos
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 w-full max-w-lg px-4">
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-20 rounded-2xl p-4 sm:p-8 backdrop-blur-lg"
        >
          <div className="text-4xl sm:text-6xl font-bold text-white mb-2">{finalesTotal}</div>
          <div className="text-base sm:text-xl text-orange-100">Rendidos</div>
        </motion.div>

        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white bg-opacity-20 rounded-2xl p-4 sm:p-8 backdrop-blur-lg"
        >
          <div className="text-4xl sm:text-6xl font-bold text-white mb-2">{finalesAprobados}</div>
          <div className="text-base sm:text-xl text-orange-100">Aprobados</div>
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

      {/* Check/Cross animations */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4">
        {Array.from({ length: finalesAprobados }).map((_, i) => (
          <motion.div
            key={`check-${i}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="text-2xl sm:text-4xl"
          >
            ️
          </motion.div>
        ))}
        {Array.from({ length: finalesTotal - finalesAprobados }).map((_, i) => (
          <motion.div
            key={`cross-${i}`}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1 + finalesAprobados * 0.1 + i * 0.1 }}
            className="text-2xl sm:text-4xl opacity-50"
          >
            
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
