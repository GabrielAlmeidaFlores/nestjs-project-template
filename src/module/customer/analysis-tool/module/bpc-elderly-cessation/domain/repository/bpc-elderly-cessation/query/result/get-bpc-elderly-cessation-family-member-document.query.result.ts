import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyCessationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/enum/bpc-elderly-cessation-family-member-document-type.enum';
import type { BpcElderlyCessationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/value-object/bpc-elderly-cessation-family-member-document-id/bpc-elderly-cessation-family-member-document-id.value-object';

export class GetBpcElderlyCessationFamilyMemberDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationFamilyMemberDocumentId;
  public readonly document: string;
  public readonly type: BpcElderlyCessationFamilyMemberDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyCessationFamilyMemberDocumentQueryResult.name;
}
