import { describe, it, expect } from 'vitest';
import { parseHomePage } from '../homeParser';

describe('homeParser', () => {
  it('should parse avance de carrera percentage', () => {
    const html = `
      <html>
        <body>
          <div>Avance de carrera: 67.50%</div>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.avanceCarreraPct).toBe(67.5);
  });

  it('should parse cursadas aprobadas', () => {
    const html = `
      <html>
        <body>
          <table>
            <tr><td>Aprobadas:</td><td>25</td></tr>
          </table>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.cursadasAprobadas).toBe(25);
  });

  it('should parse finales aprobados', () => {
    const html = `
      <html>
        <body>
          <div>Finales aprobados: 18</div>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.finalesAprobados).toBe(18);
  });

  it('should parse aprobadas pendientes de final', () => {
    const html = `
      <html>
        <body>
          <p>Aprobadas pendientes de final: 7</p>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.aprobadasPendFinal).toBe(7);
  });

  it('should parse pendientes para completar', () => {
    const html = `
      <html>
        <body>
          <span>Pendientes para completar la carrera: 12</span>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.pendientesCursada).toBe(12);
  });

  it('should handle missing data gracefully', () => {
    const html = `
      <html>
        <body>
          <p>Some random content</p>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.avanceCarreraPct).toBe(0);
    expect(result.summary.cursadasAprobadas).toBe(0);
    expect(result.summary.finalesAprobados).toBe(0);
  });

  it('should extract profile name if present', () => {
    const html = `
      <html>
        <body>
          <div>Alumno: Juan Pérez</div>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.profile.name).toBe('Juan Pérez');
  });

  it('should extract career if present', () => {
    const html = `
      <html>
        <body>
          <div>Carrera: Ingeniería en Informática</div>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.profile.career).toBe('Ingeniería en Informática');
  });

  it('should parse complex HTML with tables', () => {
    const html = `
      <html>
        <body>
          <h1>MyUP - Home</h1>
          <table>
            <tr><td>Avance de carrera</td><td>75.25%</td></tr>
            <tr><td>Aprobadas</td><td>30</td></tr>
            <tr><td>Finales aprobados</td><td>22</td></tr>
            <tr><td>Aprobadas pendientes de final</td><td>8</td></tr>
            <tr><td>Pendientes para completar la carrera</td><td>10</td></tr>
          </table>
        </body>
      </html>
    `;

    const result = parseHomePage(html);
    expect(result.summary.avanceCarreraPct).toBe(75.25);
    expect(result.summary.cursadasAprobadas).toBe(30);
    expect(result.summary.finalesAprobados).toBe(22);
    expect(result.summary.aprobadasPendFinal).toBe(8);
    expect(result.summary.pendientesCursada).toBe(10);
  });
});

