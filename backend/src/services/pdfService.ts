import PDFDocument from 'pdfkit';
import type { WrappedResponse } from '../types';

export async function generatePDF(data: WrappedResponse): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);


      doc.fontSize(28)
         .fillColor('#9333ea')
         .text('#UPWrapped', { align: 'center' });
      
      doc.moveDown(0.5);
      doc.fontSize(16)
         .fillColor('#6b7280')
         .text(`${data.yearStats.year}`, { align: 'center' });

      doc.moveDown(2);


      if (data.profile.name) {
        doc.fontSize(14)
           .fillColor('#000000')
           .text(`Alumno: ${data.profile.name}`);
        doc.moveDown(0.5);
      }

      if (data.profile.career) {
        doc.fontSize(12)
           .fillColor('#4b5563')
           .text(`Carrera: ${data.profile.career}`);
        doc.moveDown(1.5);
      }


      doc.fontSize(18)
         .fillColor('#9333ea')
         .text('Tu Avance', { underline: true });
      
      doc.moveDown(1);

      doc.fontSize(12).fillColor('#000000');
      doc.text(`Avance de carrera: ${data.summary.avanceCarreraPct.toFixed(2)}%`);
      doc.text(`Cursadas aprobadas: ${data.summary.cursadasAprobadas}`);
      doc.text(`Finales aprobados: ${data.summary.finalesAprobados}`);
      doc.text(`Aprobadas pendientes de final: ${data.summary.aprobadasPendFinal}`);
      doc.text(`Pendientes de cursada: ${data.summary.pendientesCursada}`);

      doc.moveDown(2);


      doc.fontSize(18)
         .fillColor('#9333ea')
         .text(`Tu ${data.yearStats.year}`, { underline: true });
      
      doc.moveDown(1);

      doc.fontSize(12).fillColor('#000000');
      doc.text(`Cursadas este año: ${data.yearStats.cursadasThisYear}`);
      doc.text(`Finales rendidos: ${data.yearStats.finalesThisYear}`);
      doc.text(`Finales aprobados: ${data.yearStats.finalesAprobadosThisYear}`);
      
      if (data.yearStats.promedioFinalesThisYear) {
        doc.text(`Promedio de finales: ${data.yearStats.promedioFinalesThisYear.toFixed(2)}`);
      }

      doc.moveDown(2);


      if (data.yearStats.topGrades && data.yearStats.topGrades.length > 0) {
        doc.fontSize(18)
           .fillColor('#9333ea')
           .text('Tus Mejores Notas', { underline: true });
        
        doc.moveDown(1);

        doc.fontSize(12).fillColor('#000000');
        data.yearStats.topGrades.forEach((grade, index) => {
          const type = grade.type === 'final' ? 'Final' : 'Cursada';
          doc.text(`${index + 1}. ${grade.materia} (${type}): ${grade.nota} - ${grade.fecha}`);
        });

        doc.moveDown(2);
      }


      doc.fontSize(10)
         .fillColor('#9ca3af')
         .text('No afiliado a la Universidad de Palermo', { align: 'center' });
      
      doc.text('Generado con UPWrapped', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

