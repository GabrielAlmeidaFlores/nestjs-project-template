import type { DataInterface } from '@lib/cnis-analyzer/interface/data-interface';
import type { TempoDeContribuicaoDetalhesInterface } from '@lib/cnis-analyzer/interface/time-contribution.interface';

export interface ConsolidadoRelacaoInterface {
  seq: number;
  indicadores: string | null;
  isPendencia: boolean;
  origem: string | null;
  contributionTime?: TempoDeContribuicaoDetalhesInterface;
  validContributionTime?: TempoDeContribuicaoDetalhesInterface;
  carencia?: number;
  isConcomitante: boolean;
  isBeneficio: boolean;
  isIntercalado: boolean;
  tipo?: 'principal' | 'secundario' | null;
  ajustado: boolean;
  dataAjustada?: DataInterface | null;
}
