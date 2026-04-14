import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';

export class GetSpecialRetirementGrantDocumentQueryResult extends BaseBuildableObject {
  public readonly id: Guid;
  public readonly document: string;
  public readonly type: SpecialRetirementGrantDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialRetirementGrantDocumentQueryResult.name;
}
