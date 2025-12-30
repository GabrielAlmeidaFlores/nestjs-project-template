import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import type { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

export class GetLegalProceedingDetailWithRelationsQueryResult extends BaseBuildableDtoObject {
  public readonly id: LegalProceedingDetailId;
  public readonly detail: string;
  public readonly analysisToolClientLegalProceeding: GetAnalysisToolClientLegalProceedingQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetLegalProceedingDetailWithRelationsQueryResult.name;
}
