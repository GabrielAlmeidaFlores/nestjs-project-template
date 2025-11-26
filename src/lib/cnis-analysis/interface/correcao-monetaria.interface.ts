export interface CorrecaoMonetariaItemInterface {
  fatorCorrecao: number;
  valorCorrigido: number;
  competencia: string;
  salarioOriginal: number;
  salarioAjustado: number;
  tetoAplicado: number | null;
}
