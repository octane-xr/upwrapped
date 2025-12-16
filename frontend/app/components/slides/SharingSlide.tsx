'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { WrappedData } from '../../services/api';

interface SharingSlideProps {
  data: WrappedData;
  onNext: () => void;
}

export default function SharingSlide({ data }: SharingSlideProps) {
  const shareRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!shareRef.current) return;

    try {

      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dataUrl = await toPng(shareRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true, // Skip web font processing to avoid errors
      });

      const link = document.createElement('a');
      link.download = `UPWrapped-${data.yearStats.year}.png`;
      link.href = dataUrl;
      link.click();
      
      alert('¡Imagen descargada! Ahora podés subirla a tus Instagram Stories ');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Hubo un error al generar la imagen. Probá de nuevo.');
    }
  };

  const shareToTwitter = () => {
    const text = `Mi #UPWrapped ${data.yearStats.year} \n\n ${data.summary.avanceCarreraPct.toFixed(1)}% de avance\n ${data.summary.cursadasAprobadas} cursadas aprobadas\n ${data.summary.finalesAprobados} finales aprobados\n\n¡Descubrí el tuyo!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-4 sm:p-8 shadow-2xl border border-white border-opacity-20 min-h-[500px] sm:h-[600px] flex flex-col items-center justify-center"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 text-center"
      >
         ¡Compartí tu #UPWrapped!
      </motion.h2>

      {/* Share Preview */}
      <motion.div
        ref={shareRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-8 mb-6 sm:mb-8 w-full max-w-sm"
        style={{ 
          minWidth: '320px',
          backgroundColor: '#a78bfa' 
        }}
      >
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
            #UPWrapped
          </div>
          <div className="text-2xl text-purple-100">
            {data.yearStats.year}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white bg-opacity-25 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">
              {data.summary.avanceCarreraPct.toFixed(1)}%
            </div>
            <div className="text-base text-purple-50">Avance de carrera</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-25 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {data.summary.cursadasAprobadas}
              </div>
              <div className="text-sm text-purple-50">Cursadas</div>
            </div>
            <div className="bg-white bg-opacity-25 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {data.summary.finalesAprobados}
              </div>
              <div className="text-sm text-purple-50">Finales</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm px-4 sm:px-0"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadImage}
          className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg text-sm sm:text-base"
        >
           Instagram Stories
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToTwitter}
          className="px-4 sm:px-6 py-3 bg-black text-white rounded-full font-bold shadow-lg text-sm sm:text-base"
        >
           Compartir en X
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-purple-100 text-center mt-4 sm:mt-6 max-w-md text-sm sm:text-base px-4"
      >
        ¡Gracias por usar UPWrapped! Seguí así y completá tu carrera 
      </motion.p>
    </motion.div>
  );
}

