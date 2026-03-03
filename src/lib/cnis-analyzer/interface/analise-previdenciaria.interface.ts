export interface AnalisePrevidenciariaInterface {
  type: string;
  eligibility: ElegibilidadeInterface;
  age?: number;
  gender?: string;
  requirements: RequerimentosInterface;
  points?: number | null;
  totalContributionYears?: number | null;
  totalContributionYearsAtReforma?: number | null;
  totalCarenciaMonths?: number | null;
  totalContributionMonths?: number | null;
  totalContributionDays?: number | null;
}

interface ElegibilidadeInterface {
  isEligible?: boolean;
  eligibilityDate?: Date | null;
  projectedFulfillmentDate?: Date | null;
}

interface RequerimentosInterface {
  idadeRequerida?: number;
  pontosRequeridos?: number;
  anosDeContribuicaoRequeridos?: number;
  mesesDeCarenciaRequeridos?: number;
  atingiuRequisitoDeIdade?: boolean;
  atingiuRequisitoDeContribuicao?: boolean;
  atingiuRequisitoDeCarencia?: boolean;
  atingiuRequisitoDePontos?: boolean;
  dataQueIraAtingirRequisitoDeIdade?: Date | null;
  dataQueIraAtingirRequisitoDeContribuicao?: Date | null;
  dataQueIraAtingirRequisitoDeCarencia?: Date | null;
  dataQueIraAtingirRequisitoDePontos?: Date | null;
  dataQueAtingiuRequisitoDeContribuicao?: Date | null;
  dataQueAtingiuRequisitoDeCarencia?: Date | null;
  dataQueAtingiuRequisitoDePontos?: Date | null;
  dataQueAtingiuRequisitoDeIdade?: Date | null;
}
