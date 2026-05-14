import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInssBenefitId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/value-object/permanent-incapacity-benefit-terminated-inss-benefit-id.value-object';

export interface PermanentIncapacityBenefitTerminatedInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedInssBenefitId> {
  inssBenefit: string;
  permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;
}
