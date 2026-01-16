import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetJudicialCaseAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-benefit.query.result';
import type { GetJudicialCaseAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-document.query.result';
import type { GetJudicialCaseAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-legal-proceeding.query.result';
import type { GetJudicialCaseAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/query/result/get-judicial-case-analysis-result.query.result';
import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

export class GetJudicialCaseAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: JudicialCaseAnalysisId;
  public readonly judicialCaseAnalysisResult: GetJudicialCaseAnalysisResultQueryResult | null;
  public readonly judicialCaseAnalysisLegalProceeding: GetJudicialCaseAnalysisLegalProceedingQueryResult[];
  public readonly judicialCaseAnalysisBenefit: GetJudicialCaseAnalysisBenefitQueryResult[];
  public readonly judicialCaseAnalysisDocument: GetJudicialCaseAnalysisDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetJudicialCaseAnalysisWithRelationsQueryResult.name;
}
