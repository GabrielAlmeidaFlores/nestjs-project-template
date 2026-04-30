import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';

export class GetBpcElderlyCessationInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyCessationInssBenefitQueryResult.name;
}
