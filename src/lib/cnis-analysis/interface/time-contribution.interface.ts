import type { DataInterface } from '@lib/cnis-analysis/interface/data-interface';

export interface TimeContributionDataInterface {
  data: DataInterface | null | undefined;
  abreviado: string;
  dias: number;
  meses: number;
  anos: number;
}

export interface TimeContributionInterface {
  seq: number;
  origemDoVinculo?: string;
  tipoDoVinculo?: string;
  indicadores?: string | null;
  data?: TimeContributionDataInterface;
}
