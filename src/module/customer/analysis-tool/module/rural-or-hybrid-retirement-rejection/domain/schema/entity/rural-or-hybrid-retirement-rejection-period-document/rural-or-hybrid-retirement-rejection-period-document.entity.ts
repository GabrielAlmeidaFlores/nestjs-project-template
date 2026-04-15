import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { RuralOrHybridRetirementRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/value-object/rural-or-hybrid-retirement-rejection-period-document-id.value-object';

import type { RuralOrHybridRetirementRejectionPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/rural-or-hybrid-retirement-rejection-period-document.entity.props.interface';
import type { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import type { RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/enum/rural-or-hybrid-retirement-rejection-period-document-type.enum';

export class RuralOrHybridRetirementRejectionPeriodDocumentEntity extends BaseEntity<RuralOrHybridRetirementRejectionPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum | null;
  public readonly ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionPeriodDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.ruralOrHybridRetirementRejectionPeriodId =
      props.ruralOrHybridRetirementRejectionPeriodId;
  }
}
