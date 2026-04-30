import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity.props.interface';

export class SpecialRetirementRejectionWorkSpecialPeriodEntity extends BaseEntity<SpecialRetirementRejectionWorkSpecialPeriodId> {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly harmfulAgents: string[] | null;
  public readonly otherAgents: string | null;
  public readonly companyName: string | null;
  public readonly companyDocument: FederalDocument | null;
  public readonly specialRetirementRejectionWorkPeriodId: SpecialRetirementRejectionWorkPeriodId | null;

  protected readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodEntity.name;

  public constructor(
    props: SpecialRetirementRejectionWorkSpecialPeriodEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionWorkSpecialPeriodId, props);
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.harmfulAgents = props.harmfulAgents ?? null;
    this.otherAgents = props.otherAgents ?? null;
    this.companyName = props.companyName ?? null;
    this.companyDocument = props.companyDocument ?? null;
    this.specialRetirementRejectionWorkPeriodId =
      props.specialRetirementRejectionWorkPeriodId ?? null;
  }
}
