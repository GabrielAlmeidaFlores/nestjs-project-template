import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';

export class GetBpcDisabilityTerminationLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationLegalProceedingQueryResult.name;
}
