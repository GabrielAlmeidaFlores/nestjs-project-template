export interface PeriodoDeGracaScenarioInterface {
  type: string;
  'Vínculos Considerados': number[];
  'Total de Contribuições (meses)': number;
  'Total de Contribuições Contínuas (meses, 0 se houver hiato >12m)': number;
  'Atingiu 120 Contribuições?': 'Sim' | 'Não';
  'Direito à Prorrogação de +12 meses no Período de Graça': 'Sim' | 'Não';
}
export interface PeriodoDeGracaResultInterface {
  cenarios: PeriodoDeGracaScenarioInterface[];
}
