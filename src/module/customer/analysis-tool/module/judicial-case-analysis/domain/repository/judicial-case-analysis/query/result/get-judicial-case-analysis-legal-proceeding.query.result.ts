import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';

export class GetJudicialCaseAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: JudicialCaseAnalysisLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetJudicialCaseAnalysisLegalProceedingQueryResult.name;
}

