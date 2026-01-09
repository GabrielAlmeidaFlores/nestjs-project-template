import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetAnalysisToolClientQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client.query.result';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import type { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';

export class GetAnalysisToolClientLegalProceedingWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly type: string | null;
  public readonly status: string | null;
  public readonly lastUpdated: Date | null;
  public readonly deadline: Date | null;
  public readonly analysisToolClient: GetAnalysisToolClientQueryResult;
  public readonly legalProceedingDetail: GetLegalProceedingDetailQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolClientLegalProceedingWithRelationsQueryResult.name;
}
