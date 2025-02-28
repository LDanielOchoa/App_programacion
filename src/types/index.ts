export interface ExcelData {
  headers: string[];
  rows: any[][];
}

export interface FileWithPreview extends File {
  preview?: string;
}

export type AreaType = 'Operaciones' | 'Lavado' | 'Mantenimiento' | 'Remanofactura' | 'ServiciosGenerales' | 'Vigilantes';

export interface AreaOption {
  id: AreaType;
  name: string;
  icon: string;
  description: string;
  color: string;
}