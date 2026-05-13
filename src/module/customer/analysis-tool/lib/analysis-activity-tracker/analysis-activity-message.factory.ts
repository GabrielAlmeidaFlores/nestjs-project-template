import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';

type AnalysisActivityMessageType = {
  title: string;
  description: string;
};

export class AnalysisActivityMessageFactory {
  private static readonly analysisTypeLabelMap: Record<
    AnalysisToolRecordTypeEnum,
    string
  > = {
    [AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS]: 'Análise rápida CNIS',
    [AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RGPS]:
      'Planejamento previdenciário RGPS',
    [AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RPPS]:
      'Planejamento de aposentadoria RPPS',
    [AnalysisToolRecordTypeEnum.SPECIAL_ACTIVITY]: 'Atividade especial',
    [AnalysisToolRecordTypeEnum.JUDICIAL_CASE_ANALYSIS]:
      'Análise de caso judicial',
    [AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS]:
      'Análise de procedimento administrativo INSS',
    [AnalysisToolRecordTypeEnum.MEDICAL_QUESTION_GENERATOR]:
      'Gerador de perguntas médicas',
    [AnalysisToolRecordTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS]:
      'Gerador de objeção de laudo médico-social',
    [AnalysisToolRecordTypeEnum.SPEECH_GENERATOR]: 'Gerador de discurso',
    [AnalysisToolRecordTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS]:
      'Avaliação de deficiência para BPC',
    [AnalysisToolRecordTypeEnum.MATERNITY_PAY_REJECTION]:
      'Indeferimento de salário maternidade',
    [AnalysisToolRecordTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS]:
      'Análise de renda per capita para BPC',
    [AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS]:
      'Análise de linha do tempo rural',
    [AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR]:
      'Gerador de perguntas de audiência',
    [AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS]:
      'Análise da qualidade do segurado',
    [AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING]:
      'Planejamento previdenciário para professores',
    [AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING]:
      'Planejamento de aposentadoria para deficiente',
    [AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT]:
      'Concessão de aposentadoria urbana geral',
    [AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_ANALYSIS]:
      'Análise de aposentadoria urbana geral',
    [AnalysisToolRecordTypeEnum.SPECIAL_CATEGORY_RETIREMENT]:
      'Aposentadoria categoria especial',
    [AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT]:
      'Concessão de aposentadoria para deficiente',
    [AnalysisToolRecordTypeEnum.DEATH_BENEFIT_GRANT]:
      'Concessão de pensão por morte',
    [AnalysisToolRecordTypeEnum.DEATH_BENEFIT_REJECTION]:
      'Indeferimento de pensão por morte',
    [AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_GRANT]:
      'Concessão de aposentadoria especial',
    [AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_REJECTION]:
      'Indeferimento de aposentadoria especial',
    [AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT]:
      'Concessão de benefício por incapacidade temporária',
    [AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED]:
      'Cessação de auxílio por incapacidade temporária',
    [AnalysisToolRecordTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION]:
      'Indeferimento de aposentadoria rural ou híbrida',
    [AnalysisToolRecordTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS]:
      'Análise de aposentadoria rural ou híbrida',
    [AnalysisToolRecordTypeEnum.SURVIVOR_PENSION_ANALYSIS]:
      'Análise de pensão por morte',
    [AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL]:
      'Indeferimento de aposentadoria urbana geral',
    [AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW]:
      'Revisão de aposentadoria urbana geral',
    [AnalysisToolRecordTypeEnum.ACCIDENT_BENEFIT_REJECTION]:
      'Indeferimento de auxílio-acidente',
    [AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION]:
      'Indeferimento de aposentadoria para deficiente',
    [AnalysisToolRecordTypeEnum.BPC_DISABILITY_DENIAL]:
      'Indeferimento de BPC Pessoa com Deficiência',
    [AnalysisToolRecordTypeEnum.BPC_ELDERLY_ANALYSIS]:
      'Análise de BPC ao Idoso',
    [AnalysisToolRecordTypeEnum.BPC_ELDERLY_CESSATION]:
      'Cessação de BPC ao Idoso',
    [AnalysisToolRecordTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION]:
      'Indeferimento de benefício por incapacidade temporária',
    [AnalysisToolRecordTypeEnum.MATERNITY_PAY_GRANT]:
      'Concessão de salário maternidade',
    [AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION]:
      'Indeferimento de aposentadoria de professor',
    [AnalysisToolRecordTypeEnum.BPC_DISABILITY_TERMINATION]:
      'Cessação de BPC Pessoa com Deficiência',
    [AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED]:
      'Auxílio-acidente cessado',
    [AnalysisToolRecordTypeEnum.ELDERLY_BPC_REJECTION]:
      'Indeferimento de BPC ao Idoso',
    [AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_GRANT]:
      'Concessão de auxílio-acidente',
  };

  private static readonly actionLabelMap: Record<
    AnalysisActivityActionEnum,
    string
  > = {
    [AnalysisActivityActionEnum.CREATED]: 'criada',
    [AnalysisActivityActionEnum.UPDATED]: 'atualizada',
    [AnalysisActivityActionEnum.DELETED]: 'excluída',
    [AnalysisActivityActionEnum.RESULT_ADDED]: 'finalizada com resultado',
  };

  protected readonly _type = AnalysisActivityMessageFactory.name;

  public static build(
    analysisType: AnalysisToolRecordTypeEnum,
    action: AnalysisActivityActionEnum,
  ): AnalysisActivityMessageType {
    const analysisLabel = this.analysisTypeLabelMap[analysisType];
    const actionLabel = this.actionLabelMap[action];

    return {
      title: `${analysisLabel} ${actionLabel}`,
      description: `Registro de atividade: ${analysisLabel} ${actionLabel}.`,
    };
  }
}
