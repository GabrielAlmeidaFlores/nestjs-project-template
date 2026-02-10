import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations.query.result';
import type { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { GetAdministrativeProcedureInssAnalysisQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis.query.result';
import type { GetCnisFastAnalysisQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis.query.result';
import type { GetDisabilityAssessmentForBpcAnalysisQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis.query.result';
import type { GetJudicialCaseAnalysisQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis.query.result';
import type { GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis.query.result';
import type { GetMedicalQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-with-relations.query.result';
import type { GetRuralTimelineAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import type { GetSpecialActivityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/result/get-special-activity-analysis-with-relations.query.result';
import type { GetSpeechGeneratorQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator.query.result';

export class GetAnalysisToolRecordWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolRecordId;
  public readonly status: AnalysisStatusEnum;
  public readonly code: AnalysisToolRecordCode;
  public readonly type: AnalysisToolRecordTypeEnum;
  public readonly cnisFastAnalysis: GetCnisFastAnalysisQueryResult | null;
  public readonly retirementPlanningRpps: GetRetirementPlanningRppsQueryResult | null;
  public readonly specialActivity: GetSpecialActivityAnalysisWithRelationsQueryResult | null;
  public readonly judicialCaseAnalysis: GetJudicialCaseAnalysisQueryResult | null;
  public readonly administrativeProcedureInssAnalysis: GetAdministrativeProcedureInssAnalysisQueryResult | null;
  public readonly medicalQuestionGenerator: GetMedicalQuestionGeneratorWithRelationsQueryResult | null;
  public readonly medicalAndSocialReportObjectionGeneratorAnalysis: GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult | null;
  public readonly speechGenerator: GetSpeechGeneratorQueryResult | null;
  public readonly disabilityAssessmentForBpcAnalysis: GetDisabilityAssessmentForBpcAnalysisQueryResult | null;
  public readonly ruralTimelineAnalysis: GetRuralTimelineAnalysisWithRelationsQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult;
  public readonly retirementPlanningRgps: GetRetirementPlanningRgpsWithRelationsQueryResult | null;

  protected override readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResult.name;
}
