'use client';
import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

export default function TopSubjectSlide({ data }: { data: WrappedData; onNext: () => void }) {
  const topGrade = data.yearStats.topGrades?.[0];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 sm:p-12 shadow-2xl min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center">
      <motion.h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">⭐ Materia del año</motion.h2>
      <p className="text-base sm:text-xl text-yellow-100 mb-8 sm:mb-12 px-4">La materia que definió tu año fue…</p>
      {topGrade && (
        <motion.div 
          initial={{ scale: 0, rotate: -5 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: 'spring', damping: 15, stiffness: 200 }} 
          className="bg-white bg-opacity-20 rounded-3xl p-6 sm:p-12 backdrop-blur-lg mx-4"
        >
          <div className="text-4xl sm:text-6xl font-bold text-white mb-3 sm:mb-4">{topGrade.nota}</div>
          <div className="text-xl sm:text-3xl text-yellow-100 font-bold mb-2">{topGrade.materia}</div>
          <div className="text-base sm:text-xl text-yellow-200">{topGrade.type === 'final' ? 'Final' : 'Cursada'}</div>
        </motion.div>
      )}
    </motion.div>
  );
}
