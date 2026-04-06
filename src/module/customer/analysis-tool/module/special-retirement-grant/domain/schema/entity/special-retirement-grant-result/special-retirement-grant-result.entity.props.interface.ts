import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';

export interface SpecialRetirementGrantResultEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantResultId> {
  specialRetirementGrantCompleteAnalysis?: string | null;
  specialRetirementGrantCompleteAnalysisDownload?: string | null;
  specialRetirementGrantSimplifiedAnalysis?: string | null;
  specialRetirementGrantFirstAnalysis?: string | null;
}
