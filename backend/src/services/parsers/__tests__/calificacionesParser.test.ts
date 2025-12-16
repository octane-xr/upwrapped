import { describe, it, expect } from 'vitest';
import { parseCalificacionesPage } from '../calificacionesParser';

describe('calificacionesParser', () => {
  it('should parse finales from table', () => {
    const html = `
      <html>
        <body>
          <h2>Finales</h2>
          <table>
            <tr>
              <th>Materia</th>
              <th>Código</th>
              <th>Fecha</th>
              <th>Nota</th>
              <th>Estado</th>
            </tr>
            <tr>
              <td>Matemática I</td>
              <td>12345</td>
              <td>15/06/2024</td>
              <td>8</td>
              <td>Aprobado</td>
            </tr>
            <tr>
              <td>Física I</td>
              <td>12346</td>
              <td>20/07/2024</td>
              <td>7</td>
              <td>Aprobado</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.finales).toHaveLength(2);
    expect(result.finales[0]).toMatchObject({
      materia: 'Matemática I',
      codigo: '12345',
      fecha: '15/06/2024',
      nota: 8,
      estado: 'Aprobado',
    });
  });

  it('should parse cursadas from table', () => {
    const html = `
      <html>
        <body>
          <h2>Cursadas</h2>
          <table>
            <tr>
              <th>Materia</th>
              <th>Código</th>
              <th>Fecha</th>
              <th>Nota</th>
              <th>Estado</th>
            </tr>
            <tr>
              <td>Programación I</td>
              <td>54321</td>
              <td>10/12/2024</td>
              <td>9</td>
              <td>Aprobado</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.cursadas).toHaveLength(1);
    expect(result.cursadas[0]).toMatchObject({
      materia: 'Programación I',
      codigo: '54321',
      fecha: '10/12/2024',
      nota: 9,
      estado: 'Aprobado',
    });
  });

  it('should handle empty tables', () => {
    const html = `
      <html>
        <body>
          <h2>Finales</h2>
          <table>
            <tr>
              <th>Materia</th>
              <th>Código</th>
              <th>Fecha</th>
            </tr>
          </table>
          <h2>Cursadas</h2>
          <table>
            <tr>
              <th>Materia</th>
              <th>Código</th>
              <th>Fecha</th>
            </tr>
          </table>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.finales).toHaveLength(0);
    expect(result.cursadas).toHaveLength(0);
  });

  it('should parse items without nota', () => {
    const html = `
      <html>
        <body>
          <h2>Finales</h2>
          <table>
            <tr>
              <td>Historia</td>
              <td>99999</td>
              <td>25/11/2024</td>
              <td>-</td>
              <td>En curso</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.finales).toHaveLength(1);
    expect(result.finales[0].nota).toBeUndefined();
    expect(result.finales[0].estado).toBe('En curso');
  });

  it('should handle desaprobado status', () => {
    const html = `
      <html>
        <body>
          <h2>Finales</h2>
          <table>
            <tr>
              <td>Química</td>
              <td>11111</td>
              <td>10/05/2024</td>
              <td>3</td>
              <td>Desaprobado</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.finales).toHaveLength(1);
    expect(result.finales[0].estado).toBe('Desaprobado');
    expect(result.finales[0].nota).toBe(3);
  });

  it('should parse mixed finales and cursadas', () => {
    const html = `
      <html>
        <body>
          <h2>Finales</h2>
          <table>
            <tr><td>Final Materia</td><td>111</td><td>01/01/2024</td><td>10</td><td>Aprobado</td></tr>
          </table>
          <h2>Cursadas</h2>
          <table>
            <tr><td>Cursada Materia</td><td>222</td><td>02/02/2024</td><td>9</td><td>Aprobado</td></tr>
          </table>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.finales).toHaveLength(1);
    expect(result.cursadas).toHaveLength(1);
    expect(result.finales[0].materia).toBe('Final Materia');
    expect(result.cursadas[0].materia).toBe('Cursada Materia');
  });

  it('should handle malformed HTML gracefully', () => {
    const html = `
      <html>
        <body>
          <p>No tables here</p>
        </body>
      </html>
    `;

    const result = parseCalificacionesPage(html);
    expect(result.finales).toHaveLength(0);
    expect(result.cursadas).toHaveLength(0);
  });
});

