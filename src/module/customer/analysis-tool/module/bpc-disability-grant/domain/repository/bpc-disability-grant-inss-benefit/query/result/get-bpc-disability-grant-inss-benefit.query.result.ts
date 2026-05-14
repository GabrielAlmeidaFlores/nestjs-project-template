import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityGrantInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/value-object/bpc-disability-grant-inss-benefit-id/bpc-disability-grant-inss-benefit-id.value-object';

export class GetBpcDisabilityGrantInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityGrantInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityGrantInssBenefitQueryResult.name;
}
