import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-responsible-and-client-relations.query.result';
import type { GetLegalPleadingWithResponsibleAndClientRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-responsible-and-client-relations.query.result';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

export class GetAnalysisToolRecordWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolRecordId;
  public readonly code: AnalysisToolRecordCode;
  public readonly type: AnalysisToolRecordTypeEnum;
  public readonly cnisFastAnalysis: GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult | null;
  public readonly legalPleading: GetLegalPleadingWithResponsibleAndClientRelationsQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResult.name;
}
