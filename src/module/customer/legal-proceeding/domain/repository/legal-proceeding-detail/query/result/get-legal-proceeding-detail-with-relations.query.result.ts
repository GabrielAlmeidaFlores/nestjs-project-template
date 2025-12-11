import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { GetAnalysisToolClientLegalProceedingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding-with-relations.query.result';
import type { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

export class GetLegalProceedingDetailWithRelationsQueryResult extends BaseBuildableDtoObject {
  public readonly id: LegalProceedingDetailId;
  public readonly detail: string;
  public readonly analysisToolClientLegalProceeding: GetAnalysisToolClientLegalProceedingWithRelationsQueryResult;

  protected override readonly _type =
    GetLegalProceedingDetailWithRelationsQueryResult.name;
}
