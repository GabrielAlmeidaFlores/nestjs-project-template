import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';

export class GetBpcDisabilityGrantLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityGrantLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityGrantLegalProceedingQueryResult.name;
}
