import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';

export class GetBpcDisabilityTerminationInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationInssBenefitQueryResult.name;
}
