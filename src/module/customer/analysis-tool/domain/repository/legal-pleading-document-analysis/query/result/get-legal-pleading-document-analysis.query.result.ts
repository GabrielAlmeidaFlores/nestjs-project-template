import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';

export class GetLegalPleadingDocumentAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: LegalPleadingDocumentAnalysisId;
  public analysis: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;

  protected override readonly _type =
    GetLegalPleadingDocumentAnalysisQueryResult.name;
}
