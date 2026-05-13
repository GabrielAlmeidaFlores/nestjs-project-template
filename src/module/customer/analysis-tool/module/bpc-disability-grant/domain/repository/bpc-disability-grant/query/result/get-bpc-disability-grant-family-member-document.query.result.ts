import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityGrantFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/enum/bpc-disability-grant-family-member-document-type.enum';
import type { BpcDisabilityGrantFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/value-object/bpc-disability-grant-family-member-document-id/bpc-disability-grant-family-member-document-id.value-object';

export class GetBpcDisabilityGrantFamilyMemberDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityGrantFamilyMemberDocumentId;
  public readonly document: string;
  public readonly type: BpcDisabilityGrantFamilyMemberDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityGrantFamilyMemberDocumentQueryResult.name;
}
