import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/value-object/death-benefit-period-document-id.value-object';

import type { DeathBenefitPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity.props.interface';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

export class DeathBenefitPeriodDocumentEntity extends BaseEntity<DeathBenefitPeriodDocumentId> {
  public readonly document: string;
  public readonly deathBenefitPeriodId: DeathBenefitPeriodId;

  protected readonly _type = DeathBenefitPeriodDocumentEntity.name;

  public constructor(props: DeathBenefitPeriodDocumentEntityPropsInterface) {
    super(DeathBenefitPeriodDocumentId, props);
    this.document = props.document;
    this.deathBenefitPeriodId = props.deathBenefitPeriodId;
  }
}
