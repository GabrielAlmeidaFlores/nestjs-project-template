import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import type { SpecialActivityDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';

export class GetSpecialActivityDocumentQueryResult extends BaseBuildableObject {
  public readonly id: SpecialActivityDocumentId;
  public readonly document: string;
  public readonly type: SpecialActivityDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialActivityDocumentQueryResult.name;
}
