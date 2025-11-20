import type { TimeContributionDataInterface } from '@lib/cnis-analysis/dto/time-contribution';

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
