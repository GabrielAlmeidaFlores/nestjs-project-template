import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

export class GetAnalysisToolRecordWithFullRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolRecordId;
  public readonly status: AnalysisStatusEnum;
  public readonly code: AnalysisToolRecordCode;
  public readonly type: AnalysisToolRecordTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly createdBy: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult | null;

  protected override readonly _type =
    GetAnalysisToolRecordWithFullRelationsQueryResult.name;
}
