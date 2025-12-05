export interface SalariosConcomitantesInterface {
  mesAno: string;
  totalRemuneracao: number | null;
  vinculos: {
    seq: number;
    remuneracao: number;
  }[];
}
