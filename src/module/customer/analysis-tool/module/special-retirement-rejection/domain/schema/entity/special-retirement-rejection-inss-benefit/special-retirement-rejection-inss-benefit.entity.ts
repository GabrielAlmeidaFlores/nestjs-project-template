import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/value-object/special-retirement-rejection-inss-benefit-id.value-object';

import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity.props.interface';

export class SpecialRetirementRejectionInssBenefitEntity extends BaseEntity<SpecialRetirementRejectionInssBenefitId> {
  public readonly benefitNumber: string | null;
  public readonly specialRetirementRejectionId: SpecialRetirementRejectionId | null;

  protected readonly _type = SpecialRetirementRejectionInssBenefitEntity.name;

  public constructor(
    props: SpecialRetirementRejectionInssBenefitEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionInssBenefitId, props);
    this.benefitNumber = props.benefitNumber ?? null;
    this.specialRetirementRejectionId =
      props.specialRetirementRejectionId ?? null;
  }
}
