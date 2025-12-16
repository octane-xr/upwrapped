'use client';

import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

interface IntroSlideProps {
  data: WrappedData;
  onNext: () => void;
}

export default function IntroSlide({ data, onNext }: IntroSlideProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 sm:p-12 shadow-2xl border border-white border-opacity-20 min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8"
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-black rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
          <span className="text-white text-4xl sm:text-5xl font-bold">UP</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 px-4"
      >
        Tenemos todo listo
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg sm:text-2xl text-purple-100 mb-8 sm:mb-12 px-4"
      >
        Empecemos con tu #UPWrapped {data.yearStats.year}
      </motion.p>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-purple-700 rounded-full text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-shadow"
      >
        Empezar 
      </motion.button>
    </motion.div>
  );
}

