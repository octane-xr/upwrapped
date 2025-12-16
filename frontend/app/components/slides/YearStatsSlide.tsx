'use client';
import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

export default function YearStatsSlide({ data }: { data: WrappedData; onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-12 shadow-2xl min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-8 px-4">Este año</h2>
      <p className="text-base sm:text-xl text-teal-100 mb-6 sm:mb-8 px-4">Tus números en {data.yearStats.year}</p>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-md px-4">
        <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-6"><div className="text-3xl sm:text-5xl font-bold text-white">{data.yearStats.cursadasThisYear}</div><div className="text-sm sm:text-base text-teal-100">Cursadas</div></div>
        <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-6"><div className="text-3xl sm:text-5xl font-bold text-white">{data.yearStats.finalesThisYear}</div><div className="text-sm sm:text-base text-teal-100">Finales rendidos</div></div>
        <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-6"><div className="text-3xl sm:text-5xl font-bold text-white">{data.yearStats.finalesAprobadosThisYear}</div><div className="text-sm sm:text-base text-teal-100">Finales aprobados</div></div>
        <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-6"><div className="text-3xl sm:text-5xl font-bold text-white">{data.yearStats.promedioFinalesThisYear?.toFixed(1) || '-'}</div><div className="text-sm sm:text-base text-teal-100">Promedio</div></div>
      </div>
    </motion.div>
  );
}
