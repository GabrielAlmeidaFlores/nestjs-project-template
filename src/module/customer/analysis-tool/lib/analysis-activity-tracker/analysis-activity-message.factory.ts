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
    [AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_GRANT]:
      'Concessão de aposentadoria especial',
    [AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT]:
      'Concessão de benefício por incapacidade temporária',
    [AnalysisToolRecordTypeEnum.SURVIVOR_PENSION_ANALYSIS]:
      'Análise de pensão por morte',
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
