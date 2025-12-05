import type { DataInterface } from '@lib/cnis-analyzer/interface/data-interface';

export interface TempoDeContribuicaoDetalhesInterface {
  data: DataInterface | null | undefined;
  abreviado: string;
  dias: number;
  meses: number;
  anos: number;
}

export interface TempoDeContribuicaoInterface {
  seq: number;
  origemDoVinculo?: string;
  tipoDoVinculo?: string;
  indicadores?: string | null;
  dados?: TempoDeContribuicaoDetalhesInterface | undefined;
}
