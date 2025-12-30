import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import type { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import type { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import type { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';

export interface LegalPleadingDocumentEntityPropsInterface extends BaseEntityPropsInterface<LegalPleadingDocumentId> {
  type: LegalPleadingDocumentTypeEnum;
  document: string;
  legalPleading: LegalPleadingEntity;
  legalPleadingDocumentAnalysis?: LegalPleadingDocumentAnalysisEntity | null;
}
