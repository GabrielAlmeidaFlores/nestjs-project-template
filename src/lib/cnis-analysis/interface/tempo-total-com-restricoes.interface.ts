import type { ConsolidadoRelacaoInterface } from '@lib/cnis-analysis/interface/consolidado-relation.interface';
import type { DataInterface } from '@lib/cnis-analysis/interface/data-interface';

export interface TempoRestricoesContribuicaoTotalInterface {
  dias: number;
  meses: number;
  anos: number;
}

export interface TempoComRestricaoItemInterface {
  seq: number;
  indicadores: string | null | undefined;
  contributionTime: ConsolidadoRelacaoInterface['contributionTime'];
  validContributionTime: ConsolidadoRelacaoInterface['validContributionTime'];
  carencia: number | null | undefined;
  isConcomitante: boolean | null | undefined;
  isBeneficio: boolean | null | undefined;
  isIntercalado: boolean | null | undefined;
  tipo: string | null | undefined;
  ajustado: boolean | null | undefined;
  dataAjustada: DataInterface | null | undefined;
}

export interface TempoComRestricoesResumoInterface {
  carenciaTotal: number;
  tempoTotalComRestricoesContribuicao: TempoRestricoesContribuicaoTotalInterface;
}

export interface TempoTotalComRestricoesInterface {
  tempoComRestricaoItem: TempoComRestricaoItemInterface[];
  tempoComRestricoesResumo: TempoComRestricoesResumoInterface;
}
