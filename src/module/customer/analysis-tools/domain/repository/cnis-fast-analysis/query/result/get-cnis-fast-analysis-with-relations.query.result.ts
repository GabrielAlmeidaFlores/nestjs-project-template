import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetCnisFastAnalysisClientWithRelationsQueryResult } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client/query/result/get-cnis-fast-analysis-client-with-relations.query.result';
import type { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

export class GetCnisFastAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisId;
  public readonly cnisDocument: string | null;
  public readonly cnisFastAnalysisClient: GetCnisFastAnalysisClientWithRelationsQueryResult;
  public readonly cnisFastAnalysisResult: GetCnisFastAnalysisResultQueryResult | null;
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisWithRelationsQueryResult.name;
}
