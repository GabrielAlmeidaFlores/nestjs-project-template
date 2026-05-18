import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';
import type { BpcDisabilityDenialDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/value-object/bpc-disability-denial-document-id/bpc-disability-denial-document-id.value-object';

export class GetBpcDisabilityDenialDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityDenialDocumentId;
  public readonly document: string;
  public readonly type: BpcDisabilityDenialDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityDenialDocumentQueryResult.name;
}
