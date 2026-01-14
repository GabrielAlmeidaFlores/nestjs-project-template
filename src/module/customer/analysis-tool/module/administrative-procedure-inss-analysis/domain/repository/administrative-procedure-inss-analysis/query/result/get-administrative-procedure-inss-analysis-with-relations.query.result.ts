import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetAdministrativeProcedureInssAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-benefit.query.result';
import type { GetAdministrativeProcedureInssAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-document.query.result';
import type { GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-legal-proceeding.query.result';
import type { GetAdministrativeProcedureInssAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/query/result/get-administrative-procedure-inss-analysis-result.query.result';
import type { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

export class GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AdministrativeProcedureInssAnalysisId;
  public readonly administrativeProcedureInssAnalysisResult: GetAdministrativeProcedureInssAnalysisResultQueryResult | null;
  public readonly administrativeProcedureInssAnalysisLegalProceeding: GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult[];
  public readonly administrativeProcedureInssAnalysisBenefit: GetAdministrativeProcedureInssAnalysisBenefitQueryResult[];
  public readonly administrativeProcedureInssAnalysisDocument: GetAdministrativeProcedureInssAnalysisDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult.name;
}
