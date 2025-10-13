import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetCnisFastAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import type { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
import type { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';

export class GetCnisFastAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisId;
  public readonly cnisDocument: string | null;
  public readonly status: AnalysisStatusEnum;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult;
  public readonly cnisFastAnalysisResult: GetCnisFastAnalysisResultQueryResult | null;
  public readonly cnisFastAnalysisInssBenefit: GetCnisFastAnalysisInssBenefitQueryResult[];
  public readonly cnisFastAnalysisLegalProceeding: GetCnisFastAnalysisLegalProceedingQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisWithRelationsQueryResult.name;
}
