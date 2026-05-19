import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

export interface SpecialRetirementRejectionResultEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionResultId> {
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
}
