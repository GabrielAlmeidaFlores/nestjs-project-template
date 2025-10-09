import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

export class GetAnalysisToolRecordWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolRecordId;
  public readonly code: string;
  public readonly cnisFastAnalysis: GetCnisFastAnalysisWithRelationsQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResult.name;
}
