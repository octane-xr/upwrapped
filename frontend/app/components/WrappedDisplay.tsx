'use client';

import { useState } from 'react';
import { WrappedData, downloadPDF } from '../services/api';
import WrappedCard from './WrappedCard';

interface WrappedDisplayProps {
  data: WrappedData;
  onReset: () => void;
}

export default function WrappedDisplay({ data, onReset }: WrappedDisplayProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const totalCards = 4;

  const handleNext = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {


      alert('Para descargar el PDF, usá el endpoint /api/wrapped/pdf directamente con tus credenciales.');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al descargar el PDF');
    } finally {
      setDownloadingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">#UPWrapped</h1>
          <p className="text-purple-100">{data.yearStats.year}</p>
        </div>

        {/* Card Display */}
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: totalCards }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentCard
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white bg-opacity-40'
                }`}
              />
            ))}
          </div>

          {/* Cards */}
          <div className="relative overflow-hidden rounded-2xl">
            {currentCard === 0 && <Card1 data={data} />}
            {currentCard === 1 && <Card2 data={data} />}
            {currentCard === 2 && <Card3 data={data} />}
            {currentCard === 3 && <Card4 data={data} />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={currentCard === 0}
              className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-30 transition-all"
            >
              ← Anterior
            </button>

            <span className="text-white font-medium">
              {currentCard + 1} / {totalCards}
            </span>

            <button
              onClick={handleNext}
              disabled={currentCard === totalCards - 1}
              className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-30 transition-all"
            >
              Siguiente →
            </button>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={onReset}
              className="px-6 py-3 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all"
            >
              Generar otro
            </button>
            
            <button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              className="px-6 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-all disabled:opacity-50"
            >
              {downloadingPDF ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function Card1({ data }: { data: WrappedData }) {
  return (
    <WrappedCard>
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white mb-8">
          Tu {data.yearStats.year}
        </h2>

        {data.profile.name && (
          <p className="text-2xl text-purple-100 mb-4">
            {data.profile.name}
          </p>
        )}

        {data.profile.career && (
          <p className="text-lg text-purple-200 mb-12">
            {data.profile.career}
          </p>
        )}

        <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-lg">
          <div className="mb-6">
            <div className="text-6xl font-bold text-white mb-2">
              {data.summary.avanceCarreraPct.toFixed(1)}%
            </div>
            <div className="text-purple-100 text-lg">
              Avance de carrera
            </div>
          </div>

          <div className="w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(data.summary.avanceCarreraPct, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </WrappedCard>
  );
}


function Card2({ data }: { data: WrappedData }) {
  return (
    <WrappedCard>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Este año
        </h2>
        <p className="text-purple-100">Tus números en {data.yearStats.year}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
          <div className="text-5xl font-bold text-white mb-2">
            {data.yearStats.cursadasThisYear}
          </div>
          <div className="text-purple-100">
            Cursadas
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
          <div className="text-5xl font-bold text-white mb-2">
            {data.yearStats.finalesThisYear}
          </div>
          <div className="text-purple-100">
            Finales rendidos
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
          <div className="text-5xl font-bold text-white mb-2">
            {data.yearStats.finalesAprobadosThisYear}
          </div>
          <div className="text-purple-100">
            Finales aprobados
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
          <div className="text-5xl font-bold text-white mb-2">
            {data.yearStats.promedioFinalesThisYear?.toFixed(1) || '-'}
          </div>
          <div className="text-purple-100">
            Promedio
          </div>
        </div>
      </div>
    </WrappedCard>
  );
}


function Card3({ data }: { data: WrappedData }) {
  const topGrades = data.yearStats.topGrades || [];

  return (
    <WrappedCard>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
           Tus Mejores Notas
        </h2>
        <p className="text-purple-100">Las que más brillaron</p>
      </div>

      {topGrades.length > 0 ? (
        <div className="space-y-4">
          {topGrades.map((grade, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-xl font-semibold text-white mb-1">
                  {grade.materia}
                </div>
                <div className="text-sm text-purple-200">
                  {grade.type === 'final' ? 'Final' : 'Cursada'} • {grade.fecha}
                </div>
              </div>
              <div className="text-4xl font-bold text-white ml-4">
                {grade.nota}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-purple-100 py-12">
          <p>No hay calificaciones registradas para este año</p>
        </div>
      )}
    </WrappedCard>
  );
}


function Card4({ data }: { data: WrappedData }) {
  return (
    <WrappedCard>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
           Tu Resumen Total
        </h2>
        <p className="text-purple-100">El panorama completo</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Cursadas aprobadas</span>
            <span className="text-3xl font-bold text-white">
              {data.summary.cursadasAprobadas}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Finales aprobados</span>
            <span className="text-3xl font-bold text-white">
              {data.summary.finalesAprobados}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Pendientes de final</span>
            <span className="text-3xl font-bold text-white">
              {data.summary.aprobadasPendFinal}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Por cursar</span>
            <span className="text-3xl font-bold text-white">
              {data.summary.pendientesCursada}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-2xl font-bold text-white mb-2">
           ¡Felicitaciones!
        </p>
        <p className="text-purple-100">
          Seguí así y completá tu carrera
        </p>
      </div>
    </WrappedCard>
  );
}

