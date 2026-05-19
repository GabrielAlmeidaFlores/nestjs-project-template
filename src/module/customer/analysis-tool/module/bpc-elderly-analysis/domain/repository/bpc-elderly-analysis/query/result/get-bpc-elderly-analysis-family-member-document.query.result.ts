import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/enum/bpc-elderly-analysis-family-member-document-type.enum';
import type { BpcElderlyAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/value-object/bpc-elderly-analysis-family-member-document-id/bpc-elderly-analysis-family-member-document-id.value-object';

export class GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyAnalysisFamilyMemberDocumentId;
  public readonly document: string;
  public readonly type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult.name;
}
