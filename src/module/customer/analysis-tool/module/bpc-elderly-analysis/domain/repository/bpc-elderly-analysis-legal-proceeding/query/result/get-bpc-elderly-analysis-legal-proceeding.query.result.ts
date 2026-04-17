import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/value-object/bpc-elderly-analysis-legal-proceeding-id/bpc-elderly-analysis-legal-proceeding-id.value-object';

export class GetBpcElderlyAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyAnalysisLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyAnalysisLegalProceedingQueryResult.name;
}
