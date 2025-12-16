'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WrappedData } from '../../services/api';

interface HoursSlideProps {
  data: WrappedData;
  onNext: () => void;
}

export default function HoursSlide({ data }: HoursSlideProps) {
  const totalHours = data.yearStats.cursadasThisYear * 64;
  const [displayHours, setDisplayHours] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = totalHours / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalHours) {
        setDisplayHours(totalHours);
        clearInterval(timer);
      } else {
        setDisplayHours(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalHours]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 sm:p-12 shadow-2xl border border-white border-opacity-20 min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 px-4"
      >
        Este año estuviste
      </motion.h2>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="mb-6 sm:mb-8"
      >
        <div className="text-6xl sm:text-8xl font-bold text-white mb-2">
          {displayHours}
        </div>
        <div className="text-xl sm:text-3xl text-purple-100">
          horas en clase
        </div>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-base sm:text-xl text-purple-100 max-w-md px-4"
      >
        (o por lo menos esperamos que hayas cursado esa cantidad )
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full max-w-md h-2 sm:h-3 bg-white bg-opacity-20 rounded-full mt-8 sm:mt-12 overflow-hidden mx-4"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1, duration: 2 }}
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}

