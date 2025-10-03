import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';

export class GetCnisFastAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisResultId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: FederalDocument | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly cnisAiAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetCnisFastAnalysisResultQueryResult.name;
}
