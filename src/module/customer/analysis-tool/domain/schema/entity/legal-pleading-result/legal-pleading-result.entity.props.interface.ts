import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';

export interface LegalPleadingResultEntityPropsInterface extends BaseEntityPropsInterface<LegalPleadingResultId> {
  legalPleadingCompleteAnalysis?: string | null;
  legalPleadingSimplifiedAnalysis?: string | null;
}
