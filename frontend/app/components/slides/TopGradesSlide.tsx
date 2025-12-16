'use client';
import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

export default function TopGradesSlide({ data }: { data: WrappedData; onNext: () => void }) {
  const topGrades = data.yearStats.topGrades?.slice(0, 5) || [];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-4 sm:p-8 shadow-2xl min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 px-4"> Tus Mejores Notas</h2>
      <div className="space-y-3 sm:space-y-4 w-full max-w-lg px-4">
        {topGrades.map((grade, i) => (
          <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-4 flex justify-between items-center">
            <div className="flex-1"><div className="text-base sm:text-lg font-semibold text-white">{grade.materia}</div><div className="text-xs sm:text-sm text-green-100">{grade.type === 'final' ? 'Final' : 'Cursada'}</div></div>
            <div className="text-2xl sm:text-4xl font-bold text-white ml-2">{grade.nota}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
