import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

export class GetCnisFastAnalysisClientInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisClientInssBenefitId;
  public readonly inssBenefitNumber: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisClientInssBenefitQueryResult.name;
}
