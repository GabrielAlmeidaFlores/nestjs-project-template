export interface ConcomitanciaDetalhesInterface {
  seq: number;
  contributionTime: {
    dataInicio: Date;
    dataFim: Date;
    abreviado: string;
    dias: number;
    meses: number;
    anos: number;
  };
  carencia: number;
  isConcomitante: boolean;
  tipo?: 'principal' | 'secundario' | null;
  ajustado?: boolean;
  dataAjustada?: {
    dataInicio: Date;
    dataFim: Date;
  };
}
