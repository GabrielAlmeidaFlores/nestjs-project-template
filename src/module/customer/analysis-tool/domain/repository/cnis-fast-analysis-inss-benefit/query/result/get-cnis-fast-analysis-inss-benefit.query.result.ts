import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CnisFastAnalysisInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

export class GetCnisFastAnalysisInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisInssBenefitQueryResult.name;
}
