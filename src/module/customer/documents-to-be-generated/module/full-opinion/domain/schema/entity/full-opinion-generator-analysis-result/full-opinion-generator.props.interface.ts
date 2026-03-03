import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';

export interface FullOpinionGeneratorEntityPropsInterface extends BaseEntityPropsInterface<FullOpinionGeneratorId> {
  fullOpinionGeneratorCompleteAnalysis?: string | null;
  fullOpinionGeneratorSimplifiedAnalysis?: string | null;
}
