import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/enum/bpc-disability-termination-family-member-document-type.enum';
import type { BpcDisabilityTerminationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/value-object/bpc-disability-termination-family-member-document-id/bpc-disability-termination-family-member-document-id.value-object';

export class GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationFamilyMemberDocumentId;
  public readonly document: string;
  public readonly type: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult.name;
}
