import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';

export class GetAnalysisToolClientInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolClientInssBenefitQueryResult.name;
}
