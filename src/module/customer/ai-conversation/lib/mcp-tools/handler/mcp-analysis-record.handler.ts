import { Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { McpExecuteToolCallError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-execute-tool-call.error';
import { McpRecordNotFoundError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-record-not-found.error';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AccidentAssistanceGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant-result/command/accident-assistance-grant-result.command.repository.gateway';
import { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';
import { AccidentAssistanceTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/command/accident-assistance-terminated-result.command.repository.gateway';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { AccidentBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-result/command/accident-benefit-rejection-result.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';
import { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';
import { AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/command/administrative-procedure-inss-analysis-result.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisResultId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/value-object/administrative-procedure-inss-analysis-result-id/administrative-procedure-inss-analysis-result-id.value-object';
import { AudienceQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/command/audience-question-generator-result.command.repository.gateway';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';
import { BpcDisabilityDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/command/bpc-disability-denial-result.command.repository.gateway';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';
import { BpcDisabilityGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/command/bpc-disability-grant-result.command.repository.gateway';
import { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';
import { BpcDisabilityTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/command/bpc-disability-termination-result.command.repository.gateway';
import { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';
import { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';
import { BpcElderlyAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/command/bpc-elderly-analysis-result.command.repository.gateway';
import { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';
import { BpcElderlyAnalysisResultId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/value-object/bpc-elderly-analysis-result-id/bpc-elderly-analysis-result-id.value-object';
import { BpcElderlyCessationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/command/bpc-elderly-cessation-result.command.repository.gateway';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { DeathBenefitGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-result/command/death-benefit-grant-result.command.repository.gateway';
import { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';
import { DeathBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-result/command/death-benefit-rejection-result.command.repository.gateway';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';
import { DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/command/disability-assessment-for-bpc-analysis-result.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';
import { DisabilityRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/command/disability-retirement-planning-result.command.repository.gateway';
import { DisabilityRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/disability-retirement-planning-result.entity';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';
import { DisabilityRetirementPlanningGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-result/command/disability-retirement-planning-grant-result.command.repository.gateway';
import { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';
import { DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-result/command/disability-retirement-planning-rejection-result.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-result/command/elderly-bpc-rejection-result.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';
import { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';
import { GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/command/general-urban-retirement-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';
import { GeneralUrbanRetirementDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-result/command/general-urban-retirement-denial-result.command.repository.gateway';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';
import { GeneralUrbanRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/command/general-urban-retirement-grant-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';
import { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';
import { InsuranceQualityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/command/insurance-quality-analysis-result.command.repository.gateway';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';
import { JudicialCaseAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/command/judicial-case-analysis-result.command.repository.gateway';
import { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';
import { MaternityPayGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-result/command/maternity-pay-grant-result.command.repository.gateway';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';
import { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';
import { MaternityPayRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-result/command/maternity-pay-rejection-result.command.repository.gateway';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/command/medical-and-social-report-objection-generator-analysis-result.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';
import { MedicalQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/command/medical-question-generator-result.command.repository.gateway';
import { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';
import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';
import { PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/command/per-capita-income-for-bpc-analysis-result.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';
import { RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-result/command/retirement-permanent-disability-rejection-result.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/command/retirement-permanent-disability-revision-result.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-result/command/rural-or-hybrid-retirement-analysis-result.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-result/command/rural-or-hybrid-retirement-rejection-result.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';
import { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { SpecialActivityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/command/special-activity-analysis-result.command.repository.gateway';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { SpecialActivityResultId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';
import { SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/command/special-category-retirement-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import { SpecialRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/command/special-retirement-grant-result.command.repository.gateway';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';
import { SpecialRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-result/command/special-retirement-rejection-result.command.repository.gateway';
import { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';
import { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';
import { SurvivorPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/survivor-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/command/survivor-pension-analysis-result.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { TeacherRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';
import { TeacherRetirementPlanningResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-result/command/teacher-retirement-planning-rejection-result.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';
import { TeacherRetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';
import { TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-result/command/temporary-disability-benefits-grant-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';
import { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-result/command/temporary-disability-benefits-terminated-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';
import { TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-result/command/temporary-incapacity-benefit-rejection-result.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class McpAnalysisRecordHandler {
  protected readonly _type = McpAnalysisRecordHandler.name;

  public constructor(
    private readonly analysisToolRecordQueryRepo: AnalysisToolRecordQueryRepositoryGateway,
    private readonly transactionRepo: BaseTransactionRepositoryGateway,
    private readonly retirementPlanningRppsQueryRepo: RetirementPlanningRppsQueryRepositoryGateway,
    private readonly survivorPensionQueryRepo: SurvivorPensionAnalysisQueryRepositoryGateway,
    private readonly cnisFastAnalysisResultCommandRepo: CnisFastAnalysisResultCommandRepositoryGateway,
    private readonly speechGeneratorResultCommandRepo: SpeechGeneratorResultCommandRepositoryGateway,
    private readonly judicialCaseAnalysisResultCommandRepo: JudicialCaseAnalysisResultCommandRepositoryGateway,
    private readonly adminProcedureInssResultCommandRepo: AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway,
    private readonly disabilityAssessmentBpcResultCommandRepo: DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway,
    private readonly medicalAndSocialReportResultCommandRepo: MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway,
    private readonly accidentAssistanceGrantResultCommandRepo: AccidentAssistanceGrantResultCommandRepositoryGateway,
    private readonly accidentAssistanceTerminatedResultCommandRepo: AccidentAssistanceTerminatedResultCommandRepositoryGateway,
    private readonly bpcDisabilityGrantResultCommandRepo: BpcDisabilityGrantResultCommandRepositoryGateway,
    private readonly bpcDisabilityDenialResultCommandRepo: BpcDisabilityDenialResultCommandRepositoryGateway,
    private readonly bpcDisabilityTerminationResultCommandRepo: BpcDisabilityTerminationResultCommandRepositoryGateway,
    private readonly bpcElderlyAnalysisResultCommandRepo: BpcElderlyAnalysisResultCommandRepositoryGateway,
    private readonly bpcElderlyCessationResultCommandRepo: BpcElderlyCessationResultCommandRepositoryGateway,
    private readonly insuranceQualityResultCommandRepo: InsuranceQualityAnalysisResultCommandRepositoryGateway,
    private readonly audienceQuestionGeneratorResultCommandRepo: AudienceQuestionGeneratorResultCommandRepositoryGateway,
    private readonly medicalQuestionGeneratorResultCommandRepo: MedicalQuestionGeneratorResultCommandRepositoryGateway,
    private readonly perCapitaIncomeForBpcResultCommandRepo: PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway,
    private readonly specialActivityResultCommandRepo: SpecialActivityAnalysisResultCommandRepositoryGateway,
    private readonly specialRetirementGrantResultCommandRepo: SpecialRetirementGrantResultCommandRepositoryGateway,
    private readonly specialRetirementRejectionResultCommandRepo: SpecialRetirementRejectionResultCommandRepositoryGateway,
    private readonly teacherRetirementPlanningResultCommandRepo: TeacherRetirementPlanningResultCommandRepositoryGateway,
    private readonly generalUrbanRetirementAnalysisResultCommandRepo: GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway,
    private readonly generalUrbanRetirementGrantResultCommandRepo: GeneralUrbanRetirementGrantResultCommandRepositoryGateway,
    private readonly generalUrbanRetirementReviewResultCommandRepo: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    private readonly generalUrbanRetirementDenialResultCommandRepo: GeneralUrbanRetirementDenialResultCommandRepositoryGateway,
    private readonly deathBenefitGrantResultCommandRepo: DeathBenefitGrantResultCommandRepositoryGateway,
    private readonly deathBenefitRejectionResultCommandRepo: DeathBenefitRejectionResultCommandRepositoryGateway,
    private readonly disabilityRetirementPlanningGrantResultCommandRepo: DisabilityRetirementPlanningGrantResultCommandRepositoryGateway,
    private readonly disabilityRetirementPlanningResultCommandRepo: DisabilityRetirementPlanningResultCommandRepositoryGateway,
    private readonly disabilityRetirementPlanningRejectionResultCommandRepo: DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway,
    private readonly temporaryDisabilityGrantResultCommandRepo: TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway,
    private readonly temporaryDisabilityTerminatedResultCommandRepo: TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway,
    private readonly temporaryIncapacityRejectionResultCommandRepo: TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway,
    private readonly maternityPayGrantResultCommandRepo: MaternityPayGrantResultCommandRepositoryGateway,
    private readonly maternityPayRejectionResultCommandRepo: MaternityPayRejectionResultCommandRepositoryGateway,
    private readonly retirementPermanentDisabilityRejectionResultCommandRepo: RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway,
    private readonly retirementPlanningRgpsResultCommandRepo: RetirementPlanningRgpsResultCommandRepositoryGateway,
    private readonly retirementPlanningRppsResultCommandRepo: RetirementPlanningRppsResultCommandRepositoryGateway,
    private readonly survivorPensionAnalysisResultCommandRepo: SurvivorPensionAnalysisResultCommandRepositoryGateway,
    private readonly ruralOrHybridRetirementRejectionQueryRepo: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    private readonly ruralOrHybridRetirementRejectionResultCommandRepo: RuralOrHybridRetirementRejectionResultCommandRepositoryGateway,
    private readonly ruralOrHybridRetirementAnalysisQueryRepo: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    private readonly ruralOrHybridRetirementAnalysisResultCommandRepo: RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway,
    private readonly ruralTimelineAnalysisCommandRepo: RuralTimelineAnalysisCommandRepositoryGateway,
    private readonly specialCategoryRetirementAnalysisResultCommandRepo: SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway,
    private readonly teacherRetirementPlanningRejectionQueryRepo: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    private readonly teacherRetirementPlanningRejectionResultCommandRepo: TeacherRetirementPlanningRejectionResultCommandRepositoryGateway,
    private readonly elderlyBpcRejectionQueryRepo: ElderlyBpcRejectionQueryRepositoryGateway,
    private readonly elderlyBpcRejectionResultCommandRepo: ElderlyBpcRejectionResultCommandRepositoryGateway,
    private readonly accidentBenefitRejectionQueryRepo: AccidentBenefitRejectionQueryRepositoryGateway,
    private readonly accidentBenefitRejectionResultCommandRepo: AccidentBenefitRejectionResultCommandRepositoryGateway,
    private readonly retirementPermanentDisabilityRevisionQueryRepo: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    private readonly retirementPermanentDisabilityRevisionResultCommandRepo: RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway,
    private readonly teacherRetirementPlanningRppsQueryRepo: TeacherRetirementPlanningRppsQueryRepositoryGateway,
    private readonly teacherRetirementPlanningRppsResultCommandRepo: TeacherRetirementPlanningRppsResultCommandRepositoryGateway,
  ) {}

  public async listAnalysisRecords(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const page = params['page'] as number | undefined;
    const limit = params['limit'] as number | undefined;
    const type = params['type'] as AnalysisToolRecordTypeEnum | undefined;
    const search = params['search'] as string | undefined;

    const queryParam = new ListAnalysisToolRecordQueryParam({
      ...(page !== undefined ? { page } : {}),
      ...(limit !== undefined ? { limit } : {}),
      type: type ?? null,
      searchBy: search ?? null,
    });

    const result =
      await this.analysisToolRecordQueryRepo.listByOrganizationIdAndAuthIdentityId(
        orgId,
        authId,
        queryParam,
      );

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      page: result.page,
      items: result.resource.map((r) => this.serializeRecord(r)),
    };
  }

  public async getAnalysisRecordById(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const recordId = new AnalysisToolRecordId(params['record_id'] as string);

    const record =
      await this.analysisToolRecordQueryRepo.findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
        recordId,
        orgId,
        authId,
        McpRecordNotFoundError,
      );

    return this.serializeRecord(record);
  }

  public async getAnalysisRecordByCode(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const search = params['search'] as string;
    const page = params['page'] as number | undefined;
    const limit = params['limit'] as number | undefined;

    const queryParam = new ListAnalysisToolRecordQueryParam({
      ...(page !== undefined ? { page } : {}),
      ...(limit !== undefined ? { limit } : {}),
      searchBy: search,
      type: null,
    });

    const result =
      await this.analysisToolRecordQueryRepo.listByOrganizationIdAndAuthIdentityId(
        orgId,
        authId,
        queryParam,
      );

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      page: result.page,
      items: result.resource.map((r) => this.serializeRecord(r)),
    };
  }

  public serializeRecord(
    record: GetAnalysisToolRecordWithRelationsQueryResult,
  ): Record<string, unknown> {
    return {
      id: record.id.toString(),
      type: record.type,
      status: record.status,
      code: record.code.toString(),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      client: {
        id: record.analysisToolClient.id.toString(),
        name: record.analysisToolClient.name,
        federalDocument:
          record.analysisToolClient.federalDocument?.toString() ?? null,
      },
    };
  }

  public async updateAnalysisResult(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const recordId = new AnalysisToolRecordId(params['record_id'] as string);
    const fieldName = params['field_name'] as string;
    const newContent = params['new_content'] as string;

    const record =
      await this.analysisToolRecordQueryRepo.findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
        recordId,
        orgId,
        authId,
        McpRecordNotFoundError,
      );

    switch (record.type) {
      case AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS: {
        const r = record.cnisFastAnalysis?.cnisFastAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new CnisFastAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument:
            r.clientFederalDocument !== null
              ? new FederalDocument(r.clientFederalDocument)
              : null,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          cnisCompleteAnalysis: r.cnisCompleteAnalysis,
          cnisSimplifiedAnalysis: r.cnisSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new CnisFastAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof CnisFastAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.cnisFastAnalysisResultCommandRepo.updateCnisFastAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.SPEECH_GENERATOR: {
        const r = record.speechGenerator?.speechGeneratorResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new SpeechGeneratorResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument:
            r.clientFederalDocument !== null
              ? new FederalDocument(r.clientFederalDocument)
              : null,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          speechGeneratorCompleteContent: r.speechGeneratorCompleteContent,
          speechGeneratorSimplifiedContent: r.speechGeneratorSimplifiedContent,
        };
        props[fieldName] = newContent;
        const entity = new SpeechGeneratorResultEntity(
          props as unknown as ConstructorParameters<
            typeof SpeechGeneratorResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.speechGeneratorResultCommandRepo.updateSpeechGeneratorResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.JUDICIAL_CASE_ANALYSIS: {
        const r = record.judicialCaseAnalysis?.judicialCaseAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new JudicialCaseAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument:
            r.clientFederalDocument !== null
              ? new FederalDocument(r.clientFederalDocument)
              : null,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          judicialCaseCompleteAnalysis: r.judicialCaseCompleteAnalysis,
          judicialCaseSimplifiedAnalysis: r.judicialCaseSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new JudicialCaseAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof JudicialCaseAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.judicialCaseAnalysisResultCommandRepo.updateJudicialCaseAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS: {
        const r =
          record.administrativeProcedureInssAnalysis
            ?.administrativeProcedureInssAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new AdministrativeProcedureInssAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument:
            r.clientFederalDocument !== null
              ? new FederalDocument(r.clientFederalDocument)
              : null,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          administrativeProcedureInssCompleteAnalysis:
            r.administrativeProcedureInssCompleteAnalysis,
          administrativeProcedureInssSimplifiedAnalysis:
            r.administrativeProcedureInssSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new AdministrativeProcedureInssAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof AdministrativeProcedureInssAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.adminProcedureInssResultCommandRepo.updateAdministrativeProcedureInssAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS: {
        const r =
          record.disabilityAssessmentForBpcAnalysis
            ?.disabilityAssessmentForBpcAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new DisabilityAssessmentForBpcAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          disabilityAssessmentForBpcCompleteAnalysis:
            r.disabilityAssessmentForBpcCompleteAnalysis,
          disabilityAssessmentForBpcSimplifiedAnalysis:
            r.disabilityAssessmentForBpcSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new DisabilityAssessmentForBpcAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof DisabilityAssessmentForBpcAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.disabilityAssessmentBpcResultCommandRepo.updateDisabilityAssessmentForBpcAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS: {
        const r =
          record.medicalAndSocialReportObjectionGeneratorAnalysis
            ?.medicalAndSocialReportObjectionGeneratorAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new MedicalAndSocialReportObjectionGeneratorAnalysisResultId(
          r.id,
        );
        const props: Record<string, unknown> = {
          id,
          medicalAndSocialReportObjectionGeneratorCompleteAnalysis:
            r.medicalAndSocialReportObjectionGeneratorCompleteAnalysis,
          medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis:
            r.medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity =
          new MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity(
            props as unknown as ConstructorParameters<
              typeof MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity
            >[0],
          );
        await this.transactionRepo.execute(
          this.medicalAndSocialReportResultCommandRepo.updateMedicalAndSocialReportObjectionGeneratorAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_GRANT: {
        const r = record.accidentAssistanceGrant?.accidentAssistanceGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id: r.id,
          firstAnalysis: r.firstAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
          completeAnalysis: r.completeAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new AccidentAssistanceGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof AccidentAssistanceGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.accidentAssistanceGrantResultCommandRepo.updateAccidentAssistanceGrantResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED: {
        const r =
          record.accidentAssistanceTerminated
            ?.accidentAssistanceTerminatedResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new AccidentAssistanceTerminatedResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          accidentAssistanceTerminatedCompleteAnalysis:
            r.accidentAssistanceTerminatedCompleteAnalysis,
          accidentAssistanceTerminatedSimplifiedAnalysis:
            r.accidentAssistanceTerminatedSimplifiedAnalysis,
          decisionDetails: r.decisionDetails,
          firstAnalysis: r.firstAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new AccidentAssistanceTerminatedResultEntity(
          props as unknown as ConstructorParameters<
            typeof AccidentAssistanceTerminatedResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.accidentAssistanceTerminatedResultCommandRepo.updateAccidentAssistanceTerminatedResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.BPC_DISABILITY_GRANT: {
        const r = record.bpcDisabilityGrant?.BpcDisabilityGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof BpcDisabilityGrantResultId
            ? r.id
            : new BpcDisabilityGrantResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new BpcDisabilityGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof BpcDisabilityGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.bpcDisabilityGrantResultCommandRepo.updateBpcDisabilityGrantResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.BPC_DISABILITY_DENIAL: {
        const r = record.bpcDisabilityDenial?.bpcDisabilityDenialResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof BpcDisabilityDenialResultId
            ? r.id
            : new BpcDisabilityDenialResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
          applicableRules: r.applicableRules,
          benefitSummaries: r.benefitSummaries,
          analysisDetailedText: r.analysisDetailedText,
        };
        props[fieldName] = newContent;
        const entity = new BpcDisabilityDenialResultEntity(
          props as unknown as ConstructorParameters<
            typeof BpcDisabilityDenialResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.bpcDisabilityDenialResultCommandRepo.updateBpcDisabilityDenialResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.BPC_DISABILITY_TERMINATION: {
        const r =
          record.bpcDisabilityTermination?.bpcDisabilityTerminationResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof BpcDisabilityTerminationResultId
            ? r.id
            : new BpcDisabilityTerminationResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new BpcDisabilityTerminationResultEntity(
          props as unknown as ConstructorParameters<
            typeof BpcDisabilityTerminationResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.bpcDisabilityTerminationResultCommandRepo.updateBpcDisabilityTerminationResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.BPC_ELDERLY_ANALYSIS: {
        const r = record.bpcElderlyAnalysis?.bpcElderlyAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof BpcElderlyAnalysisResultId
            ? r.id
            : new BpcElderlyAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new BpcElderlyAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof BpcElderlyAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.bpcElderlyAnalysisResultCommandRepo.updateBpcElderlyAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.BPC_ELDERLY_CESSATION: {
        const r = record.bpcElderlyCessation?.bpcElderlyCessationResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof BpcElderlyCessationResultId
            ? r.id
            : new BpcElderlyCessationResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
          applicableRules: r.applicableRules,
          benefitSummaries: r.benefitSummaries,
          analysisDetailedText: r.analysisDetailedText,
          diagnosis: r.diagnosis,
          totalHouseholdIncome: r.totalHouseholdIncome,
          perCapitaIncome: r.perCapitaIncome,
          legalRequirementsMet: r.legalRequirementsMet,
          perCapitaIncomeBelowQuarterMinimumWage:
            r.perCapitaIncomeBelowQuarterMinimumWage,
          ageEqualOrAbove65Years: r.ageEqualOrAbove65Years,
        };
        props[fieldName] = newContent;
        const entity = new BpcElderlyCessationResultEntity(
          props as unknown as ConstructorParameters<
            typeof BpcElderlyCessationResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.bpcElderlyCessationResultCommandRepo.updateBpcElderlyCessationResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS: {
        const r =
          record.insuranceQualityAnalysis?.insuranceQualityAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof InsuranceQualityAnalysisResultId
            ? r.id
            : new InsuranceQualityAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument: r.clientFederalDocument,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          insuranceQualityConclusion: r.insuranceQualityConclusion,
          gracePeriodConclusion: r.gracePeriodConclusion,
          finalRecommendation: r.finalRecommendation,
          analysisSummary: r.analysisSummary,
        };
        props[fieldName] = newContent;
        const entity = new InsuranceQualityAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof InsuranceQualityAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.insuranceQualityResultCommandRepo.updateInsuranceQualityAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR: {
        const r =
          record.audienceQuestionGenerator?.audienceQuestionGeneratorResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof AudienceQuestionGeneratorResultId
            ? r.id
            : new AudienceQuestionGeneratorResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          audienceQuestionGeneratorCompleteAnalysis:
            r.audienceQuestionGeneratorCompleteAnalysis,
          audienceQuestionGeneratorSimplifiedAnalysis:
            r.audienceQuestionGeneratorSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new AudienceQuestionGeneratorResultEntity(
          props as unknown as ConstructorParameters<
            typeof AudienceQuestionGeneratorResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.audienceQuestionGeneratorResultCommandRepo.updateAudienceQuestionGeneratorResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.MEDICAL_QUESTION_GENERATOR: {
        const r =
          record.medicalQuestionGenerator?.medicalQuestionGeneratorResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof MedicalQuestionGeneratorResultId
            ? r.id
            : new MedicalQuestionGeneratorResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument: r.clientFederalDocument,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          medicalQuestionGeneratorCompleteAnalysis:
            r.medicalQuestionGeneratorCompleteAnalysis,
          medicalQuestionGeneratorSimplifiedAnalysis:
            r.medicalQuestionGeneratorSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new MedicalQuestionGeneratorResultEntity(
          props as unknown as ConstructorParameters<
            typeof MedicalQuestionGeneratorResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.medicalQuestionGeneratorResultCommandRepo.updateMedicalQuestionGeneratorResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS: {
        const r =
          record.perCapitaIncomeForBpcAnalysis
            ?.perCapitaIncomeForBpcAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof PerCapitaIncomeForBpcAnalysisResultId
            ? r.id
            : new PerCapitaIncomeForBpcAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new PerCapitaIncomeForBpcAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof PerCapitaIncomeForBpcAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.perCapitaIncomeForBpcResultCommandRepo.updatePerCapitaIncomeForBpcAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.SPECIAL_ACTIVITY: {
        const r = record.specialActivity?.specialActivityResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof SpecialActivityResultId
            ? r.id
            : new SpecialActivityResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          specialActivityCompleteAnalysis: r.specialActivityCompleteAnalysis,
          specialActivitySimplifiedAnalysis:
            r.specialActivitySimplifiedAnalysis,
          specialActivityCompleteAnalysisDownload:
            r.specialActivityCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new SpecialActivityResultEntity(
          props as unknown as ConstructorParameters<
            typeof SpecialActivityResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.specialActivityResultCommandRepo.updateSpecialActivityResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_GRANT: {
        const r = record.specialRetirementGrant?.specialRetirementGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof SpecialRetirementGrantResultId
            ? r.id
            : new SpecialRetirementGrantResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          specialRetirementGrantCompleteAnalysis:
            r.specialRetirementGrantCompleteAnalysis,
          specialRetirementGrantCompleteAnalysisDownload:
            r.specialRetirementGrantCompleteAnalysisDownload,
          specialRetirementGrantSimplifiedAnalysis:
            r.specialRetirementGrantSimplifiedAnalysis,
          specialRetirementGrantFirstAnalysis:
            r.specialRetirementGrantFirstAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new SpecialRetirementGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof SpecialRetirementGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.specialRetirementGrantResultCommandRepo.updateSpecialRetirementGrantResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_REJECTION: {
        const r =
          record.specialRetirementRejection?.specialRetirementRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id:
            r.id instanceof SpecialRetirementRejectionResultId
              ? r.id
              : new SpecialRetirementRejectionResultId(r.id),
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new SpecialRetirementRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof SpecialRetirementRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.specialRetirementRejectionResultCommandRepo.updateSpecialRetirementRejectionResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING: {
        const r = record.teacherRetirementPlanning?.result;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id:
            r.id instanceof TeacherRetirementPlanningResultId
              ? r.id
              : new TeacherRetirementPlanningResultId(r.id),
          teacherRetirementPlanningCompleteAnalysis:
            r.teacherRetirementPlanningCompleteAnalysis,
          teacherRetirementPlanningSimplifiedAnalysis:
            r.teacherRetirementPlanningSimplifiedAnalysis,
          teacherRetirementPlanningCompleteAnalysisDownload:
            r.teacherRetirementPlanningCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new TeacherRetirementPlanningResultEntity(
          props as unknown as ConstructorParameters<
            typeof TeacherRetirementPlanningResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.teacherRetirementPlanningResultCommandRepo.updateTeacherRetirementPlanningResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING: {
        const drpData = record.disabilityRetirementPlanning;
        if (!drpData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No disability retirement planning data found',
          });
        }
        const r = drpData.result;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new DisabilityRetirementPlanningResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          disabilityRetirementPlanningCompleteAnalysis:
            r.disabilityRetirementPlanningCompleteAnalysis,
          disabilityRetirementPlanningSimplifiedAnalysis:
            r.disabilityRetirementPlanningSimplifiedAnalysis,
          disabilityRetirementPlanningCompleteAnalysisDownload:
            r.disabilityRetirementPlanningCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new DisabilityRetirementPlanningResultEntity(
          props as unknown as ConstructorParameters<
            typeof DisabilityRetirementPlanningResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.disabilityRetirementPlanningResultCommandRepo.updateDisabilityRetirementPlanningResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION: {
        const drpRejData = record.disabilityRetirementPlanningRejection;
        if (!drpRejData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No disability retirement planning rejection data found',
          });
        }
        const r = drpRejData.disabilityRetirementPlanningRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof DisabilityRetirementPlanningRejectionResultId
            ? r.id
            : new DisabilityRetirementPlanningRejectionResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new DisabilityRetirementPlanningRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof DisabilityRetirementPlanningRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.disabilityRetirementPlanningRejectionResultCommandRepo.updateDisabilityRetirementPlanningRejectionResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_ANALYSIS: {
        const r =
          record.generalUrbanRetirementAnalysis
            ?.generalUrbanRetirementAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof GeneralUrbanRetirementAnalysisResultId
            ? r.id
            : new GeneralUrbanRetirementAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          generalUrbanRetirementCompleteAnalysis:
            r.generalUrbanRetirementCompleteAnalysis,
          generalUrbanRetirementCompleteAnalysisDownload:
            r.generalUrbanRetirementCompleteAnalysisDownload,
          generalUrbanRetirementSimplifiedAnalysis:
            r.generalUrbanRetirementSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new GeneralUrbanRetirementAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof GeneralUrbanRetirementAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.generalUrbanRetirementAnalysisResultCommandRepo.updateGeneralUrbanRetirementAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT: {
        const r =
          record.generalUrbanRetirementGrant?.generalUrbanRetirementGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof GeneralUrbanRetirementGrantResultId
            ? r.id
            : new GeneralUrbanRetirementGrantResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument: r.clientFederalDocument,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          compareCnisCtps: r.compareCnisCtps,
          compareCnisCtpsRaw: r.compareCnisCtpsRaw,
          generalUrbanRetirementGrantCompleteAnalysis:
            r.generalUrbanRetirementGrantCompleteAnalysis,
          generalUrbanRetirementGrantSimplifiedAnalysis:
            r.generalUrbanRetirementGrantSimplifiedAnalysis,
          generalUrbanRetirementGrantCompleteAnalysisDownload:
            r.generalUrbanRetirementGrantCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new GeneralUrbanRetirementGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof GeneralUrbanRetirementGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.generalUrbanRetirementGrantResultCommandRepo.updateGeneralUrbanRetirementGrantResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW: {
        const r =
          record.generalUrbanRetirementReview
            ?.generalUrbanRetirementReviewResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof GeneralUrbanRetirementReviewResultId
            ? r.id
            : new GeneralUrbanRetirementReviewResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument: r.clientFederalDocument,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          compareCnisCtps: r.compareCnisCtps,
          compareCnisCtpsRaw: r.compareCnisCtpsRaw,
          benefitAwardLetterAnalysis: r.benefitAwardLetterAnalysis,
          benefitAwardLetterAnalysisRaw: r.benefitAwardLetterAnalysisRaw,
          firstAnalysis: r.firstAnalysis,
          generalUrbanRetirementReviewCompleteAnalysis:
            r.generalUrbanRetirementReviewCompleteAnalysis,
          generalUrbanRetirementReviewSimplifiedAnalysis:
            r.generalUrbanRetirementReviewSimplifiedAnalysis,
          generalUrbanRetirementReviewCompleteAnalysisDownload:
            r.generalUrbanRetirementReviewCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new GeneralUrbanRetirementReviewResultEntity(
          props as unknown as ConstructorParameters<
            typeof GeneralUrbanRetirementReviewResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.generalUrbanRetirementReviewResultCommandRepo.updateGeneralUrbanRetirementReviewResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL: {
        const r =
          record.generalUrbanRetirementDenial
            ?.generalUrbanRetirementDenialResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof GeneralUrbanRetirementDenialResultId
            ? r.id
            : new GeneralUrbanRetirementDenialResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new GeneralUrbanRetirementDenialResultEntity(
          props as unknown as ConstructorParameters<
            typeof GeneralUrbanRetirementDenialResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.generalUrbanRetirementDenialResultCommandRepo.updateGeneralUrbanRetirementDenialResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.DEATH_BENEFIT_GRANT: {
        const r = record.deathBenefitGrant?.deathBenefitGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof DeathBenefitGrantResultId
            ? r.id
            : new DeathBenefitGrantResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          deathBenefitGrantFirstAnalysis: r.deathBenefitGrantFirstAnalysis,
          deathBenefitGrantCompleteAnalysis:
            r.deathBenefitGrantCompleteAnalysis,
          deathBenefitGrantSimplifiedAnalysis:
            r.deathBenefitGrantSimplifiedAnalysis,
          deathBenefitGrantCompleteAnalysisDownload:
            r.deathBenefitGrantCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new DeathBenefitGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof DeathBenefitGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.deathBenefitGrantResultCommandRepo.updateDeathBenefitGrantResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.DEATH_BENEFIT_REJECTION: {
        const r = record.deathBenefitRejection?.deathBenefitRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof DeathBenefitRejectionResultId
            ? r.id
            : new DeathBenefitRejectionResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          deathBenefitRejectionInssDecisionAnalysis:
            r.deathBenefitRejectionInssDecisionAnalysis,
          deathBenefitRejectionFirstAnalysis:
            r.deathBenefitRejectionFirstAnalysis,
          deathBenefitRejectionCompleteAnalysis:
            r.deathBenefitRejectionCompleteAnalysis,
          deathBenefitRejectionSimplifiedAnalysis:
            r.deathBenefitRejectionSimplifiedAnalysis,
          deathBenefitRejectionCompleteAnalysisDownload:
            r.deathBenefitRejectionCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new DeathBenefitRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof DeathBenefitRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.deathBenefitRejectionResultCommandRepo.updateDeathBenefitRejectionResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT: {
        const r =
          record.disabilityRetirementPlanningGrant
            ?.disabilityRetirementPlanningGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof DisabilityRetirementPlanningGrantResultId
            ? r.id
            : new DisabilityRetirementPlanningGrantResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          disabilityRetirementPlanningGrantCompleteAnalysis:
            r.disabilityRetirementPlanningGrantCompleteAnalysis,
          disabilityRetirementPlanningGrantSimplifiedAnalysis:
            r.disabilityRetirementPlanningGrantSimplifiedAnalysis,
          disabilityRetirementPlanningGrantFirstAnalysis:
            r.disabilityRetirementPlanningGrantFirstAnalysis,
          disabilityRetirementPlanningGrantCompleteAnalysisDownload:
            r.disabilityRetirementPlanningGrantCompleteAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new DisabilityRetirementPlanningGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof DisabilityRetirementPlanningGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.disabilityRetirementPlanningGrantResultCommandRepo.updateDisabilityRetirementPlanningGrantResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT: {
        const r =
          record.temporaryDisabilityBenefitsGrant
            ?.temporaryDisabilityBenefitsGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id:
            r.id instanceof TemporaryDisabilityBenefitsGrantResultId
              ? r.id
              : new TemporaryDisabilityBenefitsGrantResultId(r.id),
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new TemporaryDisabilityBenefitsGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof TemporaryDisabilityBenefitsGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.temporaryDisabilityGrantResultCommandRepo.updateTemporaryDisabilityBenefitsGrantResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED: {
        const r = record.temporaryDisabilityBenefitsTerminated?.result;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id: new TemporaryDisabilityBenefitsTerminatedResultId(r.id),
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new TemporaryDisabilityBenefitsTerminatedResultEntity(
          props as unknown as ConstructorParameters<
            typeof TemporaryDisabilityBenefitsTerminatedResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.temporaryDisabilityTerminatedResultCommandRepo.updateTemporaryDisabilityBenefitsTerminatedResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION: {
        const r = record.temporaryIncapacityBenefitRejection?.result;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id: new TemporaryIncapacityBenefitRejectionResultId(r.id),
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new TemporaryIncapacityBenefitRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof TemporaryIncapacityBenefitRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.temporaryIncapacityRejectionResultCommandRepo.updateTemporaryIncapacityBenefitRejectionResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.MATERNITY_PAY_GRANT: {
        const r = record.maternityPayGrant?.maternityPayGrantResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id:
            r.id instanceof MaternityPayGrantResultId
              ? r.id
              : new MaternityPayGrantResultId(r.id),
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new MaternityPayGrantResultEntity(
          props as unknown as ConstructorParameters<
            typeof MaternityPayGrantResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.maternityPayGrantResultCommandRepo.updateMaternityPayGrantResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.MATERNITY_PAY_REJECTION: {
        const r = record.maternityPayRejection?.maternityPayRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const props: Record<string, unknown> = {
          id:
            r.id instanceof MaternityPayRejectionResultId
              ? r.id
              : new MaternityPayRejectionResultId(r.id),
          firstAnalysis: r.firstAnalysis,
          secondAnalysis: r.secondAnalysis,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new MaternityPayRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof MaternityPayRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.maternityPayRejectionResultCommandRepo.updateMaternityPayRejectionResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION: {
        const r =
          record.retirementPermanentDisabilityRejection
            ?.retirementPermanentDisabilityRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof RetirementPermanentDisabilityRejectionResultId
            ? r.id
            : new RetirementPermanentDisabilityRejectionResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new RetirementPermanentDisabilityRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof RetirementPermanentDisabilityRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.retirementPermanentDisabilityRejectionResultCommandRepo.updateRetirementPermanentDisabilityRejectionResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RGPS: {
        const r = record.retirementPlanningRgps?.retirementPlanningRgpsResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof RetirementPlanningRgpsResultId
            ? r.id
            : new RetirementPlanningRgpsResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          clientName: r.clientName,
          clientFederalDocument: r.clientFederalDocument,
          clientBirthDate: r.clientBirthDate,
          clientLastAffiliationDate: r.clientLastAffiliationDate,
          compareCnisCtps: r.compareCnisCtps,
          compareCnisCtpsRaw: r.compareCnisCtpsRaw,
          result: r.result,
        };
        props[fieldName] = newContent;
        const entity = new RetirementPlanningRgpsResultEntity(
          props as unknown as ConstructorParameters<
            typeof RetirementPlanningRgpsResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.retirementPlanningRgpsResultCommandRepo.updateRetirementPlanningRgpsResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RPPS: {
        const rppsData = record.retirementPlanningRpps;
        if (!rppsData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No RPPS data found',
          });
        }
        const rppsId =
          rppsData.id instanceof RetirementPlanningRppsId
            ? rppsData.id
            : new RetirementPlanningRppsId(rppsData.id);
        const rppsWithRelations =
          await this.retirementPlanningRppsQueryRepo.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
            rppsId,
            orgId,
            McpRecordNotFoundError,
          );
        const r = rppsWithRelations.retirementPlanningRppsResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof RetirementPlanningRppsResultId
            ? r.id
            : new RetirementPlanningRppsResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          retirementPlanningRppsCompleteAnalysis:
            r.retirementPlanningRppsCompleteAnalysis,
          retirementPlanningRppsSimplifiedAnalysis:
            r.retirementPlanningRppsSimplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new RetirementPlanningRppsResultEntity(
          props as unknown as ConstructorParameters<
            typeof RetirementPlanningRppsResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.retirementPlanningRppsResultCommandRepo.updateRetirementPlanningRppsResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.SURVIVOR_PENSION_ANALYSIS: {
        const spData = record.survivorPensionAnalysis;
        if (!spData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No survivor pension data found',
          });
        }
        const spId =
          spData.id instanceof SurvivorPensionAnalysisId
            ? spData.id
            : new SurvivorPensionAnalysisId(spData.id);
        const spWithRelations =
          await this.survivorPensionQueryRepo.findOneByIdOrFail(
            spId,
            McpRecordNotFoundError,
          );
        const r = spWithRelations.result;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof SurvivorPensionAnalysisResultId
            ? r.id
            : new SurvivorPensionAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          survivorPensionAnalysisId:
            r.survivorPensionAnalysisId instanceof SurvivorPensionAnalysisId
              ? r.survivorPensionAnalysisId
              : new SurvivorPensionAnalysisId(r.survivorPensionAnalysisId),
          isInsuredStatusConfirmed: r.isInsuredStatusConfirmed,
          insuredStatusSummary: r.insuredStatusSummary,
          isRetirementRightConfirmed: r.isRetirementRightConfirmed,
          retirementRightSummary: r.retirementRightSummary,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new SurvivorPensionAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof SurvivorPensionAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.survivorPensionAnalysisResultCommandRepo.updateSurvivorPensionAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS:
        throw new McpExecuteToolCallError({
          toolName,
          message:
            'Use dedicated tool get_teacher_retirement_planning_rpps and update_teacher_retirement_planning_rpps_result for TEACHER_RETIREMENT_PLANNING_RPPS analyses',
        });

      case AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS: {
        const r = record.ruralTimelineAnalysis;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof RuralTimelineAnalysisId
            ? r.id
            : new RuralTimelineAnalysisId(r.id);
        const props: Record<string, unknown> = {
          id,
          ruralTimelineCompleteAnalysis: r.ruralTimelineCompleteAnalysis,
          ruralTimelineSimplifiedAnalysis: r.ruralTimelineSimplifiedAnalysis,
          ruralTimelinePeriodDocumentAnalysis:
            r.ruralTimelinePeriodDocumentAnalysis,
          workRegime: r.workRegime,
          analysisToolClientId: record.analysisToolClient.id,
        };
        props[fieldName] = newContent;
        const entity = new RuralTimelineAnalysisEntity(
          props as unknown as ConstructorParameters<
            typeof RuralTimelineAnalysisEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.ruralTimelineAnalysisCommandRepo.updateRuralTimeline(entity),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.SPECIAL_CATEGORY_RETIREMENT: {
        const r = record.specialCategoryRetirementAnalysis?.analysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.specialCategoryRetirementAnalysisResultId instanceof
          SpecialCategoryRetirementAnalysisResultId
            ? r.specialCategoryRetirementAnalysisResultId
            : new SpecialCategoryRetirementAnalysisResultId(
                r.specialCategoryRetirementAnalysisResultId,
              );
        const props: Record<string, unknown> = {
          id,
          specialCategoryRetirementAnalysisId:
            r.specialCategoryRetirementAnalysisId,
          simplifiedAnalysisSummaryText: r.simplifiedAnalysisSummaryText,
          fullAnalysisConclusionText: r.fullAnalysisConclusionText,
          administrativeProcedureAnalysis: r.administrativeProcedureAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new SpecialCategoryRetirementAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof SpecialCategoryRetirementAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.specialCategoryRetirementAnalysisResultCommandRepo.updateSpecialCategoryRetirementAnalysisResult(
            id,
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION: {
        const rejectionData = record.ruralOrHybridRetirementRejection;
        if (!rejectionData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No rural or hybrid retirement rejection data found',
          });
        }
        const rejectionId =
          rejectionData.id instanceof RuralOrHybridRetirementRejectionId
            ? rejectionData.id
            : new RuralOrHybridRetirementRejectionId(rejectionData.id);
        const rejectionWithRelations =
          await this.ruralOrHybridRetirementRejectionQueryRepo.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
            rejectionId,
            McpRecordNotFoundError,
          );
        const r = rejectionWithRelations.ruralOrHybridRetirementRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof RuralOrHybridRetirementRejectionResultId
            ? r.id
            : new RuralOrHybridRetirementRejectionResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          ruralOrHybridRetirementRejectionId: rejectionId,
          firstAnalysis: r.firstAnalysis,
          secondAnalysis: r.secondAnalysis,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysisDownload: r.simplifiedAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new RuralOrHybridRetirementRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof RuralOrHybridRetirementRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.ruralOrHybridRetirementRejectionResultCommandRepo.updateRuralOrHybridRetirementRejectionResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS: {
        const analysisData = record.ruralOrHybridRetirementAnalysis;
        if (!analysisData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No rural or hybrid retirement analysis data found',
          });
        }
        const analysisId =
          analysisData.id instanceof RuralOrHybridRetirementAnalysisId
            ? analysisData.id
            : new RuralOrHybridRetirementAnalysisId(analysisData.id);
        const analysisWithRelations =
          await this.ruralOrHybridRetirementAnalysisQueryRepo.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
            analysisId,
            McpRecordNotFoundError,
          );
        const r = analysisWithRelations.ruralOrHybridRetirementAnalysisResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof RuralOrHybridRetirementAnalysisResultId
            ? r.id
            : new RuralOrHybridRetirementAnalysisResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          ruralOrHybridRetirementAnalysisId: analysisId,
          firstAnalysis: r.firstAnalysis,
          secondAnalysis: r.secondAnalysis,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysisDownload: r.simplifiedAnalysisDownload,
        };
        props[fieldName] = newContent;
        const entity = new RuralOrHybridRetirementAnalysisResultEntity(
          props as unknown as ConstructorParameters<
            typeof RuralOrHybridRetirementAnalysisResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.ruralOrHybridRetirementAnalysisResultCommandRepo.updateRuralOrHybridRetirementAnalysisResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.ACCIDENT_BENEFIT_REJECTION:
        throw new McpExecuteToolCallError({
          toolName,
          message:
            'Use the dedicated tool update_accident_benefit_rejection_result with the accident_benefit_rejection_id parameter instead',
        });

      case AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION: {
        const rejectionData = record.teacherRetirementPlanningRejection;
        if (!rejectionData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No teacher retirement planning rejection data found',
          });
        }
        const rejectionId =
          rejectionData.id instanceof TeacherRetirementPlanningRejectionId
            ? rejectionData.id
            : new TeacherRetirementPlanningRejectionId(rejectionData.id);
        const rejectionWithRelations =
          await this.teacherRetirementPlanningRejectionQueryRepo.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
            rejectionId,
            McpRecordNotFoundError,
          );
        const r = rejectionWithRelations.result;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id = new TeacherRetirementPlanningRejectionResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          inssDecisionAnalysis: r.inssDecisionAnalysis,
          firstAnalysis: r.firstAnalysis,
          completeAnalysis: r.completeAnalysis,
          completeAnalysisDownload: r.completeAnalysisDownload,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new TeacherRetirementPlanningRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof TeacherRetirementPlanningRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.teacherRetirementPlanningRejectionResultCommandRepo.updateTeacherRetirementPlanningRejectionResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.ELDERLY_BPC_REJECTION: {
        const elderlyData = record.elderlyBpcRejection;
        if (!elderlyData) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No elderly BPC rejection data found',
          });
        }
        const elderlyId =
          elderlyData.id instanceof ElderlyBpcRejectionId
            ? elderlyData.id
            : new ElderlyBpcRejectionId(elderlyData.id);
        const elderlyWithRelations =
          await this.elderlyBpcRejectionQueryRepo.findOneByElderlyBpcRejectionIdOrFailWithRelations(
            elderlyId,
            McpRecordNotFoundError,
          );
        const r = elderlyWithRelations.elderlyBpcRejectionResult;
        if (!r) {
          throw new McpExecuteToolCallError({
            toolName,
            message: 'No result found',
          });
        }
        const id =
          r.id instanceof ElderlyBpcRejectionResultId
            ? r.id
            : new ElderlyBpcRejectionResultId(r.id);
        const props: Record<string, unknown> = {
          id,
          elderlyBpcRejectionId: elderlyId,
          completeAnalysis: r.completeAnalysis,
          simplifiedAnalysis: r.simplifiedAnalysis,
        };
        props[fieldName] = newContent;
        const entity = new ElderlyBpcRejectionResultEntity(
          props as unknown as ConstructorParameters<
            typeof ElderlyBpcRejectionResultEntity
          >[0],
        );
        await this.transactionRepo.execute(
          this.elderlyBpcRejectionResultCommandRepo.updateElderlyBpcRejectionResult(
            entity,
          ),
        );
        break;
      }

      case AnalysisToolRecordTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION:
        throw new McpExecuteToolCallError({
          toolName,
          message:
            'Use the dedicated tool update_retirement_permanent_disability_revision_result with the retirement_permanent_disability_revision_id parameter instead',
        });

      default:
        throw new McpExecuteToolCallError({
          toolName,
          message: `Update not supported for analysis type: ${String(record.type)}`,
        });
    }

    return {
      success: true,
      message: `Field '${fieldName}' updated successfully`,
    };
  }

  public async getAccidentBenefitRejection(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const rawId = params['accident_benefit_rejection_id'] as string;
    if (!rawId) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'accident_benefit_rejection_id is required',
      });
    }
    const id = new AccidentBenefitRejectionId(rawId);
    await this.analysisToolRecordQueryRepo.findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      id,
      orgId,
      authId,
      McpRecordNotFoundError,
    );
    const result =
      await this.accidentBenefitRejectionQueryRepo.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
        id,
        McpRecordNotFoundError,
      );
    return result;
  }

  public async updateAccidentBenefitRejectionResult(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const rawId = params['accident_benefit_rejection_id'] as string;
    const fieldName = params['field_name'] as string;
    const newContent = params['new_content'] as string | null | undefined;
    if (!rawId) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'accident_benefit_rejection_id is required',
      });
    }
    if (!fieldName) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'field_name is required',
      });
    }
    if (newContent === undefined || newContent === null) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'new_content is required',
      });
    }
    const id = new AccidentBenefitRejectionId(rawId);
    await this.analysisToolRecordQueryRepo.findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      id,
      orgId,
      authId,
      McpRecordNotFoundError,
    );
    const withRelations =
      await this.accidentBenefitRejectionQueryRepo.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
        id,
        McpRecordNotFoundError,
      );
    const r = withRelations.accidentBenefitRejectionResult;
    if (!r) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'No result found for this accident benefit rejection',
      });
    }
    const resultId =
      r.id instanceof AccidentBenefitRejectionResultId
        ? r.id
        : new AccidentBenefitRejectionResultId(r.id);
    const props: Record<string, unknown> = {
      id: resultId,
      firstAnalysis: r.firstAnalysis,
      secondAnalysis: r.secondAnalysis,
      completeAnalysis: r.completeAnalysis,
      simplifiedAnalysis: r.simplifiedAnalysis,
      completeAnalysisDownload: r.completeAnalysisDownload,
    };
    props[fieldName] = newContent;
    const entity = new AccidentBenefitRejectionResultEntity(
      props as unknown as ConstructorParameters<
        typeof AccidentBenefitRejectionResultEntity
      >[0],
    );
    await this.transactionRepo.execute(
      this.accidentBenefitRejectionResultCommandRepo.updateAccidentBenefitRejectionResult(
        entity,
      ),
    );
    return {
      success: true,
      message: `Field '${fieldName}' updated successfully`,
    };
  }

  public async getRetirementPermanentDisabilityRevision(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const rawId = params[
      'retirement_permanent_disability_revision_id'
    ] as string;
    if (!rawId) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'retirement_permanent_disability_revision_id is required',
      });
    }
    const id = new RetirementPermanentDisabilityRevisionId(rawId);
    await this.analysisToolRecordQueryRepo.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      id,
      orgId,
      authId,
      McpRecordNotFoundError,
    );
    const result =
      await this.retirementPermanentDisabilityRevisionQueryRepo.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        id,
        McpRecordNotFoundError,
      );
    return result;
  }

  public async updateRetirementPermanentDisabilityRevisionResult(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const rawId = params[
      'retirement_permanent_disability_revision_id'
    ] as string;
    const fieldName = params['field_name'] as string;
    const newContent = params['new_content'] as string | null | undefined;
    if (!rawId) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'retirement_permanent_disability_revision_id is required',
      });
    }
    if (!fieldName) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'field_name is required',
      });
    }
    if (newContent === undefined || newContent === null) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'new_content is required',
      });
    }
    const id = new RetirementPermanentDisabilityRevisionId(rawId);
    await this.analysisToolRecordQueryRepo.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      id,
      orgId,
      authId,
      McpRecordNotFoundError,
    );
    const withRelations =
      await this.retirementPermanentDisabilityRevisionQueryRepo.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        id,
        McpRecordNotFoundError,
      );
    const r = withRelations.result;
    if (!r) {
      throw new McpExecuteToolCallError({
        toolName,
        message:
          'No result found for this retirement permanent disability revision',
      });
    }
    const resultId =
      r.id instanceof RetirementPermanentDisabilityRevisionResultId
        ? r.id
        : new RetirementPermanentDisabilityRevisionResultId(r.id);
    const props: Record<string, unknown> = {
      id: resultId,
      retirementPermanentDisabilityRevisionFirstAnalysis:
        r.retirementPermanentDisabilityRevisionFirstAnalysis,
      retirementPermanentDisabilityRevisionCompleteAnalysis:
        r.retirementPermanentDisabilityRevisionCompleteAnalysis,
      retirementPermanentDisabilityRevisionCompleteAnalysisDownload:
        r.retirementPermanentDisabilityRevisionCompleteAnalysisDownload,
      retirementPermanentDisabilityRevisionSimplifiedAnalysis:
        r.retirementPermanentDisabilityRevisionSimplifiedAnalysis,
    };
    props[fieldName] = newContent;
    const entity = new RetirementPermanentDisabilityRevisionResultEntity(
      props as unknown as ConstructorParameters<
        typeof RetirementPermanentDisabilityRevisionResultEntity
      >[0],
    );
    await this.transactionRepo.execute(
      this.retirementPermanentDisabilityRevisionResultCommandRepo.updateRetirementPermanentDisabilityRevisionResult(
        resultId,
        entity,
      ),
    );
    return {
      success: true,
      message: `Field '${fieldName}' updated successfully`,
    };
  }
  public async getTeacherRetirementPlanningRpps(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const rawId = params['teacher_retirement_planning_rpps_id'] as string;
    if (!rawId) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'teacher_retirement_planning_rpps_id is required',
      });
    }
    const rppsId = new TeacherRetirementPlanningRppsId(rawId);
    // Auth check via the shared table method (same underlying DB row)
    await this.analysisToolRecordQueryRepo.findWithRelationsByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
      new TeacherRetirementPlanningId(rawId),
      orgId,
      authId,
      McpRecordNotFoundError,
    );
    const result =
      await this.teacherRetirementPlanningRppsQueryRepo.findOneTeacherRetirementPlanningByIdWithRelations(
        rppsId,
      );
    if (!result) {
      throw new McpRecordNotFoundError();
    }
    return result;
  }

  public async updateTeacherRetirementPlanningRppsResult(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const rawId = params['teacher_retirement_planning_rpps_id'] as string;
    const fieldName = params['field_name'] as string;
    const newContent = params['new_content'] as string | null | undefined;
    if (!rawId) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'teacher_retirement_planning_rpps_id is required',
      });
    }
    if (!fieldName) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'field_name is required',
      });
    }
    if (newContent === undefined || newContent === null) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'new_content is required',
      });
    }
    const rppsId = new TeacherRetirementPlanningRppsId(rawId);
    // Auth check via the shared table method (same underlying DB row)
    await this.analysisToolRecordQueryRepo.findWithRelationsByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
      new TeacherRetirementPlanningId(rawId),
      orgId,
      authId,
      McpRecordNotFoundError,
    );
    const withRelations =
      await this.teacherRetirementPlanningRppsQueryRepo.findOneTeacherRetirementPlanningByIdWithRelations(
        rppsId,
      );
    if (!withRelations) {
      throw new McpRecordNotFoundError();
    }
    const r = withRelations.result;
    if (!r) {
      throw new McpExecuteToolCallError({
        toolName,
        message:
          'No result found for this teacher retirement planning RPPS analysis',
      });
    }
    const resultId =
      r.id instanceof TeacherRetirementPlanningRppsResultId
        ? r.id
        : new TeacherRetirementPlanningRppsResultId(r.id);
    const props: Record<string, unknown> = {
      id: resultId,
      teacherRetirementPlanningCompleteAnalysis:
        r.teacherRetirementPlanningCompleteAnalysis,
      teacherRetirementPlanningSimplifiedAnalysis:
        r.teacherRetirementPlanningSimplifiedAnalysis,
      teacherRetirementPlanningCompleteAnalysisDownload:
        r.teacherRetirementPlanningCompleteAnalysisDownload,
    };
    props[fieldName] = newContent;
    const entity = new TeacherRetirementPlanningRppsResultEntity(
      props as unknown as ConstructorParameters<
        typeof TeacherRetirementPlanningRppsResultEntity
      >[0],
    );
    await this.transactionRepo.execute(
      this.teacherRetirementPlanningRppsResultCommandRepo.updateTeacherRetirementPlanningResult(
        entity,
      ),
    );
    return {
      success: true,
      message: `Field '${fieldName}' updated successfully`,
    };
  }

  private getOrgContext(params: Record<string, unknown>): {
    orgId: OrganizationId;
    authId: AuthIdentityId;
  } {
    const orgId = new OrganizationId(params['organization_id'] as string);
    const authId = new AuthIdentityId(params['auth_identity_id'] as string);
    return { orgId, authId };
  }
}
