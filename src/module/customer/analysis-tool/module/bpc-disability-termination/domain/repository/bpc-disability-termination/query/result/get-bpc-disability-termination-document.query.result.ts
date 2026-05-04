import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';
import type { BpcDisabilityTerminationDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/value-object/bpc-disability-termination-document-id/bpc-disability-termination-document-id.value-object';

export class GetBpcDisabilityTerminationDocumentQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationDocumentId;
  public readonly document: string;
  public readonly name: string;
  public readonly type: BpcDisabilityTerminationDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationDocumentQueryResult.name;
}
