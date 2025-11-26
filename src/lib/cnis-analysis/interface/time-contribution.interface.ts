export interface TimeContributionDataInterface {
  dataInicio?: Date | null | undefined;
  dataFim?: Date | null | undefined;
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
