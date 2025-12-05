import type { DataInterface } from '@lib/cnis-analysis/interface/data-interface';

export interface ConcomitanciaDetalhesInterface {
  seq: number;
  contributionTime: {
    dataInicio: Date | null | undefined;
    dataFim: Date | null | undefined;
    abreviado: string;
    dias: number;
    meses: number;
    anos: number;
  };
  carencia: number;
  isConcomitante: boolean;
  tipo?: 'principal' | 'secundario' | null;
  ajustado?: boolean;
  dataAjustada?: DataInterface | null | undefined;
}
