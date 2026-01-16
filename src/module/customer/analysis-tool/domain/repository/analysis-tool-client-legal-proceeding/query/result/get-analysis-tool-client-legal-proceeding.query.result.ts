import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { LegalProceedingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/enum/legal-proceeding-status.enum';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

export class GetAnalysisToolClientLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly type: string | null;
  public readonly status: LegalProceedingStatusEnum | null;
  public readonly lastUpdated: Date | null;
  public readonly deadline: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAnalysisToolClientLegalProceedingQueryResult.name;
}
