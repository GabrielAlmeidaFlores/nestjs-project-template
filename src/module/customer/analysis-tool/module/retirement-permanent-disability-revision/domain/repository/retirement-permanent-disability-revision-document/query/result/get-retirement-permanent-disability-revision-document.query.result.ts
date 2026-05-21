import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import type { RetirementPermanentDisabilityRevisionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/value-object/retirement-permanent-disability-revision-document-id.value-object';

export class GetRetirementPermanentDisabilityRevisionDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRevisionDocumentId;
  public readonly document: string;
  public readonly type: RetirementPermanentDisabilityRevisionDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt?: Date | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionDocumentQueryResult.name;
}
