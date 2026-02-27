import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';

export class GetJudicialCaseAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: JudicialCaseAnalysisResultId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: FederalDocument | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly judicialCaseCompleteAnalysis: string | null;
  public readonly judicialCaseSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetJudicialCaseAnalysisResultQueryResult.name;
}
