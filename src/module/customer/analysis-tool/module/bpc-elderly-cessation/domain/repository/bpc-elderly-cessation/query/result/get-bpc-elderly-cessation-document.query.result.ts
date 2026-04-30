import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';
import type { BpcElderlyCessationDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/value-object/bpc-elderly-cessation-document-id/bpc-elderly-cessation-document-id.value-object';

export class GetBpcElderlyCessationDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationDocumentId;
  public readonly document: string;
  public readonly type: BpcElderlyCessationDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyCessationDocumentQueryResult.name;
}
