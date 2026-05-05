import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/value-object/special-retirement-rejection-legal-proceeding-id.value-object';

import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity.props.interface';

export class SpecialRetirementRejectionLegalProceedingEntity extends BaseEntity<SpecialRetirementRejectionLegalProceedingId> {
  public readonly number: string | null;
  public readonly specialRetirementRejectionId: SpecialRetirementRejectionId | null;

  protected readonly _type =
    SpecialRetirementRejectionLegalProceedingEntity.name;

  public constructor(
    props: SpecialRetirementRejectionLegalProceedingEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionLegalProceedingId, props);
    this.number = props.number ?? null;
    this.specialRetirementRejectionId =
      props.specialRetirementRejectionId ?? null;
  }
}
