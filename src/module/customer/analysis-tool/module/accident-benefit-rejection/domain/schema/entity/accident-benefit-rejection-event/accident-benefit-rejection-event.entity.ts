import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';

import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionEventEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity.props.interface';

export class AccidentBenefitRejectionEventEntity extends BaseEntity<AccidentBenefitRejectionEventId> {
  public readonly accidentDate: Date | null;
  public readonly accidentDescription: string | null;
  public readonly cidTenId: CidTenId | null;
  public readonly accidentBenefitRejectionId: AccidentBenefitRejectionId | null;

  protected readonly _type = AccidentBenefitRejectionEventEntity.name;

  public constructor(props: AccidentBenefitRejectionEventEntityPropsInterface) {
    super(AccidentBenefitRejectionEventId, props);
    this.accidentDate = props.accidentDate ?? null;
    this.accidentDescription = props.accidentDescription ?? null;
    this.cidTenId = props.cidTenId ?? null;
    this.accidentBenefitRejectionId = props.accidentBenefitRejectionId ?? null;
  }
}
