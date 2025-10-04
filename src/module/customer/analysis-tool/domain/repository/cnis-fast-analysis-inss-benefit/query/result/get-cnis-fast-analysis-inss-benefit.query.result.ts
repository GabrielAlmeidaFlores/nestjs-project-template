import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

export class GetAnalysisToolClientInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientInssBenefitId;
  public readonly inssBenefitNumber: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolClientInssBenefitQueryResult.name;
}
