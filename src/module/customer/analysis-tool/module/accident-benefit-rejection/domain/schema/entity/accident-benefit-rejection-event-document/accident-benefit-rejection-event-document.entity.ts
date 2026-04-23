import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionEventDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/value-object/accident-benefit-rejection-event-document-id.value-object';

import type { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import type { AccidentBenefitRejectionEventDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity.props.interface';
import type { AccidentBenefitRejectionEventDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/enum/accident-benefit-rejection-event-document-type.enum';

export class AccidentBenefitRejectionEventDocumentEntity extends BaseEntity<AccidentBenefitRejectionEventDocumentId> {
  public readonly document: string | null;
  public readonly type: AccidentBenefitRejectionEventDocumentTypeEnum | null;
  public readonly accidentBenefitRejectionEventId: AccidentBenefitRejectionEventId | null;

  protected readonly _type = AccidentBenefitRejectionEventDocumentEntity.name;

  public constructor(
    props: AccidentBenefitRejectionEventDocumentEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionEventDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.accidentBenefitRejectionEventId =
      props.accidentBenefitRejectionEventId ?? null;
  }
}
