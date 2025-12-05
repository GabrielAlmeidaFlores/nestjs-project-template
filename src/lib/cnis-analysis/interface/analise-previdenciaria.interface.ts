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
  requiredAge?: number;
  requiredPoints?: number;
  requiredContributionYears?: number;
  requiredCarenciaMonths?: number;
  atingiuRequisitoDeIdade?: boolean;
  atingiuRequisitoDeContribuicao?: boolean;
  atingiuRequisitoDeCarencia?: boolean;
  atingiuRequisitoDePontos?: boolean;
  dataQueAtingiraRequisitoDeIdade?: Date | null;
  dataQueIraAtingirRequisitoDeContribuicao?: Date | null;
  dataQueIraAtingirRequisitoDeCarencia?: Date | null;
  dataQueIraAtingirRequisitoDePontos?: Date | null;
  reachedContributionRequirementDate?: Date | null;
  reachedCarenciaRequirementDate?: Date | null;
  reachedPointsRequirementDate?: Date | null;
  reachedAgeRequirementDate?: Date | null;
}
