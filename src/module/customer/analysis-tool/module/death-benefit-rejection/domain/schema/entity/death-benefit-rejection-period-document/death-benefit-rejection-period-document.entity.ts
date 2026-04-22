import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/value-object/death-benefit-rejection-period-document-id.value-object';

import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { DeathBenefitRejectionPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity.props.interface';

export class DeathBenefitRejectionPeriodDocumentEntity extends BaseEntity<DeathBenefitRejectionPeriodDocumentId> {
  public readonly document: string;
  public readonly deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId;

  protected readonly _type = DeathBenefitRejectionPeriodDocumentEntity.name;

  public constructor(
    props: DeathBenefitRejectionPeriodDocumentEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionPeriodDocumentId, props);
    this.document = props.document;
    this.deathBenefitRejectionPeriodId = props.deathBenefitRejectionPeriodId;
  }
}
