import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';
import type { BpcElderlyAnalysisDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/value-object/bpc-elderly-analysis-document-id/bpc-elderly-analysis-document-id.value-object';

export class GetBpcElderlyAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyAnalysisDocumentId;
  public readonly document: string;
  public readonly type: BpcElderlyAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyAnalysisDocumentQueryResult.name;
}
