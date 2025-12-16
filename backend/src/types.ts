export interface LoginCredentials {
  username: string;
  password: string;
}

export interface WrappedRequest {
  username: string;
  password: string;
  year?: number;
}

export interface ProfileData {
  name?: string;
  career?: string;
  plan?: string;
}

export interface SummaryData {
  avanceCarreraPct: number;
  cursadasAprobadas: number;
  finalesAprobados: number;
  aprobadasPendFinal: number;
  pendientesCursada: number;
  pendientesFinal: number;
}

export interface TopGrade {
  type: 'final' | 'cursada';
  materia: string;
  nota: number;
  fecha: string;
}

export interface YearStats {
  year: number;
  cursadasThisYear: number;
  finalesThisYear: number;
  finalesAprobadosThisYear: number;
  promedioFinalesThisYear?: number;
  topGrades?: TopGrade[];
}

export interface CursadaItem {
  materia: string;
  codigo: string;
  fecha: string;
  nota?: number;
  estado: string;
}

export interface FinalItem {
  materia: string;
  codigo: string;
  fecha: string;
  nota?: number;
  estado: string;
}

export interface WrappedResponse {
  profile: ProfileData;
  summary: SummaryData;
  yearStats: YearStats;
  lists: {
    cursadas: CursadaItem[];
    finales: FinalItem[];
  };
}

export interface HomePageData {
  profile: ProfileData;
  summary: SummaryData;
}

export interface CalificacionesPageData {
  cursadas: CursadaItem[];
  finales: FinalItem[];
}

