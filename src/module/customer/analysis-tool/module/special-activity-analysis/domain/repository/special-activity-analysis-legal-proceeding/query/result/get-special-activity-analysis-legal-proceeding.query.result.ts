import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';

export class GetSpecialActivityAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: SpecialActivityLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialActivityAnalysisLegalProceedingQueryResult.name;
}
