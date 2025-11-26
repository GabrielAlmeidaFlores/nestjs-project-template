export interface SalariosConcomitantesInterface {
  mesAno: string; // Formato "MM/YYYY"
  totalRemuneracao: number | null; // Soma das remunerações para o mês/ano
  vinculos: {
    seq: number;
    remuneracao: number;
  }[];
}
