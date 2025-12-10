import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

export class GetAnalysisToolClientLegalProceedingWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolClientLegalProceedingWithRelationsQueryResult.name;
}
