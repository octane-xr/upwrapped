'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WrappedData } from '../services/api';
import { slides } from './slides';

interface WrappedCarouselProps {
  data: WrappedData;
  onReset: () => void;
}

export default function WrappedCarousel({ data, onReset }: WrappedCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection;
    if (newSlide >= 0 && newSlide < slides.length) {
      setDirection(newDirection);
      setCurrentSlide(newSlide);
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 px-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-6 sm:w-8 bg-white'
                  : index < currentSlide
                  ? 'w-3 sm:w-4 bg-white bg-opacity-60'
                  : 'w-3 sm:w-4 bg-white bg-opacity-30'
              }`}
            />
          ))}
        </div>

        {/* Slide Container */}
        <div className="relative min-h-[500px] sm:h-[600px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <CurrentSlideComponent data={data} onNext={() => paginate(1)} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4 sm:mt-6 px-2 sm:px-4">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-white bg-opacity-20 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-30 transition-all font-medium text-sm sm:text-base"
          >
            <span className="hidden sm:inline">← Anterior</span>
            <span className="sm:hidden">←</span>
          </button>

          <span className="text-white font-medium text-sm sm:text-base">
            {currentSlide + 1} / {slides.length}
          </span>

          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-white bg-opacity-20 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-30 transition-all font-medium text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Siguiente →</span>
            <span className="sm:hidden">→</span>
          </button>
        </div>

        {/* Reset Button */}
        {currentSlide === slides.length - 1 && (
          <div className="text-center mt-4 sm:mt-6">
            <button
              onClick={onReset}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all font-medium text-sm sm:text-base"
            >
              Generar otro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

