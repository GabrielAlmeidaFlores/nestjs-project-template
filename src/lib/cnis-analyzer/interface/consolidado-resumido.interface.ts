import type { TempoDeContribuicaoDetalhesInterface } from '@lib/cnis-analyzer/interface/time-contribution.interface';

export interface CnisConsolidadeResumidoInterface {
  seq: number;
  contributionTime?: TempoDeContribuicaoDetalhesInterface;
  carencia: number;
  isConcomitante: boolean;
}
