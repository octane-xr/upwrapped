import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface WrappedData {
  profile: {
    name?: string;
    career?: string;
    plan?: string;
  };
  summary: {
    avanceCarreraPct: number;
    cursadasAprobadas: number;
    finalesAprobados: number;
    aprobadasPendFinal: number;
    pendientesCursada: number;
    pendientesFinal: number;
  };
  yearStats: {
    year: number;
    cursadasThisYear: number;
    finalesThisYear: number;
    finalesAprobadosThisYear: number;
    promedioFinalesThisYear?: number;
    topGrades?: Array<{
      type: 'final' | 'cursada';
      materia: string;
      nota: number;
      fecha: string;
    }>;
  };
  lists: {
    cursadas: Array<{
      materia: string;
      codigo: string;
      fecha: string;
      nota?: number;
      estado: string;
    }>;
    finales: Array<{
      materia: string;
      codigo: string;
      fecha: string;
      nota?: number;
      estado: string;
    }>;
  };
}

export async function generateWrapped(
  username: string,
  password: string,
  year?: number
): Promise<WrappedData> {
  try {
    const response = await axios.post<WrappedData>(
      `${API_BASE_URL}/api/wrapped`,
      {
        username,
        password,
        year: year || new Date().getFullYear(),
      },
      {
        timeout: 30000, // 30 seconds
      }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {

        const message = error.response.data?.error || 'Error del servidor';
        throw new Error(message);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('La solicitud tardó demasiado. Por favor, intentá de nuevo.');
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('No se pudo conectar con el servidor. Verificá tu conexión.');
      }
    }
    throw new Error('Error inesperado. Por favor, intentá de nuevo.');
  }
}

export async function downloadPDF(
  username: string,
  password: string,
  year?: number
): Promise<Blob> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/wrapped/pdf`,
      {
        username,
        password,
        year: year || new Date().getFullYear(),
      },
      {
        responseType: 'blob',
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error('Error al generar el PDF');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('La solicitud tardó demasiado. Por favor, intentá de nuevo.');
      }
    }
    throw new Error('Error al descargar el PDF');
  }
}

