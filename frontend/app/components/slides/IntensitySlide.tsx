'use client';
import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

export default function IntensitySlide({ data }: { data: WrappedData; onNext: () => void }) {
  const finales = data.lists.finales;
  const isIntense = finales.filter(f => f.estado.includes('Aprobado')).length >= 3;
  return (
    <motion.div 
      animate={{ scale: isIntense ? [1, 1.02] : 1 }} 
      transition={{ 
        repeat: Infinity, 
        repeatType: 'reverse',
        duration: 1,
        ease: 'easeInOut'
      }} 
      className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-6 sm:p-12 shadow-2xl min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-8 px-4"> Modo Intensidad</h2>
      <p className="text-lg sm:text-2xl text-red-100 max-w-lg px-4">{isIntense ? 'Estuviste en modo intensivo este año. Respeto total 🫡' : 'Supiste dosificar. Nada mal '}</p>
    </motion.div>
  );
}
