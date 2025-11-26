export interface CnisConsolidadeResumidoInterface {
  seq: number;
  contributionTime?: ContributionTimeInterface;
  carencia: number;
  isConcomitante: boolean;
}

export interface ContributionTimeInterface {
  dataInicio?: Date;
  dataFim?: Date;
  abreviado: string;
  dias: number;
  meses: number;
  anos: number;
}
