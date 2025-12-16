'use client';

import { motion } from 'framer-motion';
import { WrappedData } from '../../services/api';

interface SongSlideProps {
  data: WrappedData;
  onNext: () => void;
}

export default function SongSlide({ data }: SongSlideProps) {
  const finalesAprobados = data.yearStats.finalesAprobadosThisYear;
  const finalesTotal = data.yearStats.finalesThisYear;

  const targetYear = data.yearStats.year;
  const cursadasAprobadas = data.lists.cursadas.filter(c => {
    const match = c.fecha.match(/\d{4}/);
    const year = match ? parseInt(match[0], 10) : 0;
    return year === targetYear && c.estado.toLowerCase().includes('aprobado');
  }).length;
  const cursadasTotal = data.yearStats.cursadasThisYear;


  const performance = ((finalesAprobados + cursadasAprobadas) / (finalesTotal + cursadasTotal)) || 0;
  
  let song, artist, videoId, startTime, message;
  
  if (performance === 1) {
    song = '1,2 Ultraviolento';
    artist = 'Los Violadores';
    videoId = 'q0nRQ2Mc1o8';
    startTime = 32;
    message = 'Arrasaste. Punto.';
  } else if (performance >= 0.7) {
    song = 'Luna de miel';
    artist = 'Virus';
    videoId = 'mQNqA3WHaZE';
    startTime = 53;
    message = 'No fue perfecto, pero fue un buen año ';
  } else {
    song = 'Por mil noches';
    artist = 'Airbag';
    videoId = '5xIGSaeEH9A';
    startTime = 0;
    message = 'No fue fácil… pero todo pasa. Incluso este año.';
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-4 sm:p-12 shadow-2xl border border-white border-opacity-20 min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center text-center"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
      >
         Canción del año
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-base sm:text-xl text-pink-100 mb-4 sm:mb-8 px-4"
      >
        {message}
      </motion.p>

      {/* Equalizer Animation */}
      <motion.div 
        className="flex gap-1 sm:gap-2 items-end h-16 sm:h-24 mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
      >
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 sm:w-4 bg-white rounded-t-full"
            animate={{
              height: ['30%', '100%'],
            }}
            transition={{
              duration: 0.6 + (i * 0.1),
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-3 sm:mb-4 mx-4"
      >
        <div className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{song}</div>
        <div className="text-base sm:text-xl text-pink-100">{artist}</div>
      </motion.div>

      {/* YouTube Embed */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm sm:max-w-md aspect-video rounded-xl overflow-hidden shadow-2xl mx-4"
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&mute=0`}
          title={song}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
}

