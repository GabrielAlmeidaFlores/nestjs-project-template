import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { RetirementPermanentDisabilityRevisionLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/value-object/retirement-permanent-disability-revision-legal-proceeding-id.value-object';

export class GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult extends BaseBuildableDtoObject {
  public readonly id: RetirementPermanentDisabilityRevisionLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt?: Date | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult.name;
}
