import type { TimeContributionDataInterface } from '@lib/cnis-analysis/interface/time-contribution.interface';

export interface ConsolidadoRelationInterface {
  seq: number;
  indicadores: string | null;
  isPendencia: boolean;
  origem: string | null;
  contributionTime?: TimeContributionDataInterface;
  validContributionTime?: TimeContributionDataInterface;
  carencia?: number;
  isConcomitante: boolean;
  isBeneficio: boolean;
  isIntercalado: boolean;
  tipo?: 'principal' | 'secundario' | null;
  ajustado: boolean;
  dataAjustada?: {
    dataInicio?: Date | null;
    dataFim?: Date | null;
  } | null;
}
