import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/value-object/special-retirement-rejection-work-special-period-legal-framework-id.value-object';

import type { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.entity.props.interface';

export class SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity extends BaseEntity<SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId> {
  public readonly code: string | null;
  public readonly description: string | null;
  public readonly specialRetirementRejectionWorkSpecialPeriodId: SpecialRetirementRejectionWorkSpecialPeriodId | null;

  protected readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity.name;

  public constructor(
    props: SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId, props);
    this.code = props.code ?? null;
    this.description = props.description ?? null;
    this.specialRetirementRejectionWorkSpecialPeriodId =
      props.specialRetirementRejectionWorkSpecialPeriodId ?? null;
  }
}
