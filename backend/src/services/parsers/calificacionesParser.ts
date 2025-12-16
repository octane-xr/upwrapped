import * as cheerio from 'cheerio';
import type { CalificacionesPageData, CursadaItem, FinalItem } from '../../types';

export function parseCalificacionesPage(html: string): CalificacionesPageData {
  const $ = cheerio.load(html);
  
  const cursadas: CursadaItem[] = [];
  const finales: FinalItem[] = [];


  let currentSection: 'finales' | 'cursadas' | null = null;


  $('#titulo3').each((_, titleDiv) => {
    const titleText = $(titleDiv).find('a').first().text().trim().toLowerCase();
    
    if (titleText === 'finales') {
      currentSection = 'finales';
    } else if (titleText === 'cursadas') {
      currentSection = 'cursadas';
    } else {
      return; // Skip other sections
    }


    const container = $(titleDiv).next('#columna-sin-scroll');
    
    if (container.length === 0) return;


    container.find('div[id="mob"]').each((_, mobDiv) => {
      const item = parseMobDiv($, mobDiv);
      if (item) {
        if (currentSection === 'finales') {
          finales.push(item);
        } else if (currentSection === 'cursadas') {
          cursadas.push(item);
        }
      }
    });
  });

  return { cursadas, finales };
}

function parseMobDiv($: cheerio.CheerioAPI, mobDiv: cheerio.Element): CursadaItem | FinalItem | null {
  const text = $(mobDiv).html() || '';
  


  const strongMatch = text.match(/<strong>(.*?)<br>/i);
  if (!strongMatch) return null;
  
  const strongText = strongMatch[1];
  

  const materiaMatch = strongText.match(/^([^.]+)\./);
  if (!materiaMatch) return null;
  const materia = materiaMatch[1].trim();
  

  let nota: number | undefined;
  let estado = 'Desconocido';
  
  const notaEstadoMatch = strongText.match(/Nota:\s*(\d+)\s*-\s*([^<]+)/i);
  if (notaEstadoMatch) {
    nota = parseInt(notaEstadoMatch[1], 10);
    estado = notaEstadoMatch[2].trim();
  } else {

    const estadoMatch = strongText.match(/\.\s+([^<]+)$/i);
    if (estadoMatch) {
      estado = estadoMatch[1].trim();
    }
  }
  

  const codigoMatch = text.match(/C[oó]digo:\s*(\d+)/i);
  if (!codigoMatch) return null;
  const codigo = codigoMatch[1];
  

  const fechaMatch = text.match(/Fecha:\s*(\d{2}\/\d{2}\/\d{4})/i);
  if (!fechaMatch) return null;
  const fecha = fechaMatch[1];
  
  return {
    materia,
    codigo,
    fecha,
    nota,
    estado,
  };
}

