import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/value-object/special-retirement-rejection-work-period-document-id.value-object';

import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.entity.props.interface';

export class SpecialRetirementRejectionWorkPeriodDocumentEntity extends BaseEntity<SpecialRetirementRejectionWorkPeriodDocumentId> {
  public readonly fileName: string | null;
  public readonly type: string | null;
  public readonly specialRetirementRejectionWorkPeriodId: SpecialRetirementRejectionWorkPeriodId | null;

  protected readonly _type =
    SpecialRetirementRejectionWorkPeriodDocumentEntity.name;

  public constructor(
    props: SpecialRetirementRejectionWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionWorkPeriodDocumentId, props);
    this.fileName = props.fileName ?? null;
    this.type = props.type ?? null;
    this.specialRetirementRejectionWorkPeriodId =
      props.specialRetirementRejectionWorkPeriodId ?? null;
  }
}
