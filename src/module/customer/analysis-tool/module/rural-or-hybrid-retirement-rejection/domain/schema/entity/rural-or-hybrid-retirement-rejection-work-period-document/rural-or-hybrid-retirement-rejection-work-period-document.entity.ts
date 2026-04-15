import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { RuralOrHybridRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/value-object/rural-or-hybrid-retirement-rejection-work-period-document-id.value-object';

import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/rural-or-hybrid-retirement-rejection-work-period-document.entity.props.interface';
import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/enum/rural-or-hybrid-retirement-rejection-work-period-document-type.enum';

export class RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity extends BaseEntity<RuralOrHybridRetirementRejectionWorkPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionWorkPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementRejectionWorkPeriodId =
      props.ruralOrHybridRetirementRejectionWorkPeriodId;
  }
}
