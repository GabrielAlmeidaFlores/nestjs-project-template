import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';

export class GetJudicialCaseAnalysisBenefitQueryResult extends BaseBuildableObject {
  public readonly id: JudicialCaseAnalysisBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetJudicialCaseAnalysisBenefitQueryResult.name;
}

