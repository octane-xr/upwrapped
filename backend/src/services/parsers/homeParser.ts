import * as cheerio from 'cheerio';
import type { HomePageData, ProfileData, SummaryData } from '../../types';

export function parseHomePage(html: string): HomePageData {
  const $ = cheerio.load(html);
  
  const profile: ProfileData = {};
  const summary: SummaryData = {
    avanceCarreraPct: 0,
    cursadasAprobadas: 0,
    finalesAprobados: 0,
    aprobadasPendFinal: 0,
    pendientesCursada: 0,
    pendientesFinal: 0,
  };


  const avanceMatch = html.match(/Avance de carrera[^:]*:\s*(\d+(?:\.\d+)?)\s*%/i);
  if (avanceMatch) {
    summary.avanceCarreraPct = parseFloat(avanceMatch[1]);
  }


  
  const divs = $('div[id^="tabla"]');
  const values: number[] = [];
  
  divs.each((_, elem) => {
    const text = $(elem).text().trim();
    const num = parseInt(text, 10);
    if (!isNaN(num)) {
      values.push(num);
    }
  });


  let aprobadasIndex = -1;
  let pendientesFinalesIndex = -1;
  let pendientesCursadaIndex = -1;

  $('div').each((index, elem) => {
    const text = $(elem).text().trim();
    
    if (text === 'Aprobadas' && aprobadasIndex === -1) {
      aprobadasIndex = index;
    } else if (text === 'Aprobadas pendientes de final' && pendientesFinalesIndex === -1) {
      pendientesFinalesIndex = index;
    } else if (text.includes('Pendientes para completar')) {
      pendientesCursadaIndex = index;
    }
  });


  if (aprobadasIndex >= 0) {
    const nextDivs = $('div').slice(aprobadasIndex + 1, aprobadasIndex + 3);
    const nums: number[] = [];
    nextDivs.each((_, elem) => {
      const text = $(elem).text().trim();
      const num = parseInt(text, 10);
      if (!isNaN(num)) {
        nums.push(num);
      }
    });
    if (nums.length >= 2) {
      summary.cursadasAprobadas = nums[0];
      summary.finalesAprobados = nums[1];
    }
  }

  if (pendientesFinalesIndex >= 0) {
    const nextDivs = $('div').slice(pendientesFinalesIndex + 1, pendientesFinalesIndex + 3);
    const nums: number[] = [];
    nextDivs.each((_, elem) => {
      const text = $(elem).text().trim();
      const num = parseInt(text, 10);
      if (!isNaN(num)) {
        nums.push(num);
      }
    });
    if (nums.length >= 1) {
      summary.aprobadasPendFinal = nums[0];
    }
  }

  if (pendientesCursadaIndex >= 0) {
    const nextDivs = $('div').slice(pendientesCursadaIndex + 1, pendientesCursadaIndex + 3);
    const nums: number[] = [];
    nextDivs.each((_, elem) => {
      const text = $(elem).text().trim();
      const num = parseInt(text, 10);
      if (!isNaN(num)) {
        nums.push(num);
      }
    });
    if (nums.length >= 2) {
      summary.pendientesCursada = nums[0];
      summary.pendientesFinal = nums[1];
    }
  }

  return { profile, summary };
}

