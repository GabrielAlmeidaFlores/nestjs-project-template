import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

export abstract class AnalysisProcessorGateway {
  public abstract getCnisCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getCnisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getLegalPleadingCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getLegalPleadingSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getRetirementPlanningRppsCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getTeacherRetirementPlanningCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getSpecialActivityCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getSpecialActivitySimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(cnisDocument: Buffer): Promise<CnisModel>;

  public abstract getLegalPleadingQuickDocumentAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getJudicialCaseAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getJudicialCaseAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getAdministrativeProcedureInssAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getAdministrativeProcedureInssAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getAudienceQuestionGeneratorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getAudienceQuestionGeneratorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getMedicalQuestionGeneratorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getMedicalQuestionGeneratorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getMedicalAndSocialReportObjectionGeneratorAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getMedicalAndSocialReportObjectionGeneratorAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpeechGeneratorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityAssessmentForBpcAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpeechGeneratorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityAssessmentForBpcAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getPerCapitaIncomeForBpcCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getPerCapitaIncomeForBpcSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getInsuranceQualityAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getInsuranceQualityAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getTeacherRetirementPlanningSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getTeacherRetirementPlanningAdministrativeProcessAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningAdministrativeProcessAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementAdministrativeRequestDeniedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementBenefitAwardLetterAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpecialCategoryRetirementConversionAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpecialCategoryRetirementRulesAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpecialCategoryRetirementAdministrativeProcedureAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpecialRetirementGrantCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getMiniAdvisorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSpecialRetirementGrantSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getMiniAdvisorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getSpecialRetirementGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningGrantResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningGrantTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningGrantPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningGrantSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDeathBenefitGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getTemporaryDisabilityBenefitsGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getDeathBenefitGrantTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDeathBenefitGrantResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getTemporaryDisabilityBenefitsGrantCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDeathBenefitGrantSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getTemporaryDisabilityBenefitsGrantSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSurvivorPensionAnalysisResult(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSurvivorPensionAnalysisRetirementRules(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSurvivorPensionAnalysisDependentPensionAnalyses(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSurvivorPensionAnalysisCompleteAnalysisText(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSurvivorPensionAnalysisSimplifiedAnalysisText(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementDenialInssDecisionAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementDenialTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementDenialFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementDenialPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementDenialResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getGeneralUrbanRetirementDenialSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningRejectionInssDecisionAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getBpcElderlyAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson?: boolean,
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningRejectionPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningRejectionResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getDisabilityRetirementPlanningRejectionSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getBpcElderlyAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;
}
