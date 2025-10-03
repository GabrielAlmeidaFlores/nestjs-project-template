import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

export class GetCnisFastAnalysisClientLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisClientLegalProceedingId;
  public readonly legalProceedingNumber: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisClientLegalProceedingQueryResult.name;
}
