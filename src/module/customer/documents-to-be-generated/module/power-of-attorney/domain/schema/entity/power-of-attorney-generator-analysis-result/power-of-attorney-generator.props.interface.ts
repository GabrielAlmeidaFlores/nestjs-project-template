import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';

export interface PowerOfAttorneyGeneratorEntityPropsInterface extends BaseEntityPropsInterface<PowerOfAttorneyGeneratorId> {
  powerOfAttorneyGeneratorCompleteAnalysis?: string | null;
}
