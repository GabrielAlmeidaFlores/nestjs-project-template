import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityDenialFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/enum/bpc-disability-denial-family-member-document-type.enum';
import type { BpcDisabilityDenialFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/value-object/bpc-disability-denial-family-member-document-id/bpc-disability-denial-family-member-document-id.value-object';

export class GetBpcDisabilityDenialFamilyMemberDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityDenialFamilyMemberDocumentId;
  public readonly document: string;
  public readonly type: BpcDisabilityDenialFamilyMemberDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityDenialFamilyMemberDocumentQueryResult.name;
}
