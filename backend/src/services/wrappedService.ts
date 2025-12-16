import type { WrappedRequest, WrappedResponse, YearStats, TopGrade } from '../types';
import { MyUPClient } from './myupClient';

export async function generateWrapped(request: WrappedRequest): Promise<WrappedResponse> {
  const client = new MyUPClient();
  const targetYear = request.year || new Date().getFullYear();


  await client.login({
    username: request.username,
    password: request.password,
  });


  const [homeData, calificacionesData] = await Promise.all([
    client.fetchHomePage(),
    client.fetchCalificaciones(targetYear),
  ]);


  const yearStats = calculateYearStats(
    targetYear,
    calificacionesData.cursadas,
    calificacionesData.finales
  );

  return {
    profile: homeData.profile,
    summary: homeData.summary,
    yearStats,
    lists: {
      cursadas: calificacionesData.cursadas,
      finales: calificacionesData.finales,
    },
  };
}

function calculateYearStats(
  year: number,
  cursadas: any[],
  finales: any[]
): YearStats {

  const cursadasThisYear = cursadas.filter(c => {
    const match = c.fecha.match(/\d{4}/);
    return match && parseInt(match[0], 10) === year;
  });

  const finalesThisYear = finales.filter(f => {
    const match = f.fecha.match(/\d{4}/);
    return match && parseInt(match[0], 10) === year;
  });

  const finalesAprobadosThisYear = finalesThisYear.filter(f => 
    f.estado.toLowerCase().includes('aprobado')
  );


  const notasFinales = finalesAprobadosThisYear
    .map(f => f.nota)
    .filter((n): n is number => typeof n === 'number' && n > 0);

  const promedioFinalesThisYear = notasFinales.length > 0
    ? notasFinales.reduce((sum, n) => sum + n, 0) / notasFinales.length
    : undefined;


  const topGrades: TopGrade[] = [];


  const finalesWithNota = finalesAprobadosThisYear
    .filter(f => typeof f.nota === 'number' && f.nota > 0)
    .sort((a, b) => (b.nota || 0) - (a.nota || 0))
    .slice(0, 3);

  finalesWithNota.forEach(f => {
    topGrades.push({
      type: 'final',
      materia: f.materia,
      nota: f.nota!,
      fecha: f.fecha,
    });
  });


  const cursadasWithNota = cursadasThisYear
    .filter(c => typeof c.nota === 'number' && c.nota > 0)
    .sort((a, b) => (b.nota || 0) - (a.nota || 0))
    .slice(0, 3);

  cursadasWithNota.forEach(c => {
    topGrades.push({
      type: 'cursada',
      materia: c.materia,
      nota: c.nota!,
      fecha: c.fecha,
    });
  });


  topGrades.sort((a, b) => b.nota - a.nota);
  const topGradesFiltered = topGrades.slice(0, 5);

  return {
    year,
    cursadasThisYear: cursadasThisYear.length,
    finalesThisYear: finalesThisYear.length,
    finalesAprobadosThisYear: finalesAprobadosThisYear.length,
    promedioFinalesThisYear,
    topGrades: topGradesFiltered.length > 0 ? topGradesFiltered : undefined,
  };
}

