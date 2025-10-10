import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';

export class GetCnisFastAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisLegalProceedingQueryResult.name;
}
