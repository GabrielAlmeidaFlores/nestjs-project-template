import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';

export interface LegalPleadingDocumentAnalysisEntityPropsInterface
  extends BaseEntityPropsInterface<LegalPleadingDocumentAnalysisId> {
  analysis: string;
}
