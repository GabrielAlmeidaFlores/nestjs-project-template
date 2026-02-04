import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import type { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';

export interface SpecialActivityInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<SpecialActivityInssBenefitId> {
  inssBenefitNumber: string;
  specialActivity: SpecialActivityEntity;
}
