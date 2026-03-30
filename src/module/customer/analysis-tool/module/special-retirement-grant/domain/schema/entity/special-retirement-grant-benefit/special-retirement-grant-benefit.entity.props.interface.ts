import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import type { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';

export interface SpecialRetirementGrantBenefitEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantBenefitId> {
  inssBenefitNumber: string;
  specialRetirementGrant: SpecialRetirementGrantEntity;
}
