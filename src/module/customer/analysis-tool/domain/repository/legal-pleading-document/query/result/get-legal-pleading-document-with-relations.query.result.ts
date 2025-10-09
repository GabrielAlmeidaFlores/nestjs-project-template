import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import type { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import type { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';

export class GetLegalPleadingDocumentWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: LegalPleadingDocumentId;
  public readonly type: LegalPleadingDocumentTypeEnum;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly legalPleadingDocumentAnalysis: LegalPleadingDocumentAnalysisEntity | null;

  protected override readonly _type =
    GetLegalPleadingDocumentWithRelationsQueryResult.name;
}
