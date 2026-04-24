import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';

export class GetBpcDisabilityDenialLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityDenialLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityDenialLegalProceedingQueryResult.name;
}
