import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/value-object/accident-benefit-rejection-work-period-document-id.value-object';

import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity.props.interface';
import type { AccidentBenefitRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/enum/accident-benefit-rejection-work-period-document-type.enum';

export class AccidentBenefitRejectionWorkPeriodDocumentEntity extends BaseEntity<AccidentBenefitRejectionWorkPeriodDocumentId> {
  public readonly document: string | null;
  public readonly type: AccidentBenefitRejectionWorkPeriodDocumentTypeEnum | null;
  public readonly accidentBenefitRejectionWorkPeriodId: AccidentBenefitRejectionWorkPeriodId | null;

  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodDocumentEntity.name;

  public constructor(
    props: AccidentBenefitRejectionWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionWorkPeriodDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.accidentBenefitRejectionWorkPeriodId =
      props.accidentBenefitRejectionWorkPeriodId ?? null;
  }
}
