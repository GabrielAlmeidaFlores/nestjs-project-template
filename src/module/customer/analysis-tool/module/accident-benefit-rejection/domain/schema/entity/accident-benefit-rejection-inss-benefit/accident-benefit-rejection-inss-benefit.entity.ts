import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/value-object/accident-benefit-rejection-inss-benefit-id.value-object';

import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity.props.interface';

export class AccidentBenefitRejectionInssBenefitEntity extends BaseEntity<AccidentBenefitRejectionInssBenefitId> {
  public readonly inssBenefit: string | null;
  public readonly accidentBenefitRejectionId: AccidentBenefitRejectionId | null;

  protected readonly _type = AccidentBenefitRejectionInssBenefitEntity.name;

  public constructor(
    props: AccidentBenefitRejectionInssBenefitEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit ?? null;
    this.accidentBenefitRejectionId = props.accidentBenefitRejectionId ?? null;
  }
}
