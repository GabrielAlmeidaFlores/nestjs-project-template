import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/value-object/death-benefit-grant-period-document-id.value-object';

import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import type { DeathBenefitGrantPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity.props.interface';

export class DeathBenefitGrantPeriodDocumentEntity extends BaseEntity<DeathBenefitGrantPeriodDocumentId> {
  public readonly document: string;
  public readonly deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId;

  protected readonly _type = DeathBenefitGrantPeriodDocumentEntity.name;

  public constructor(
    props: DeathBenefitGrantPeriodDocumentEntityPropsInterface,
  ) {
    super(DeathBenefitGrantPeriodDocumentId, props);
    this.document = props.document;
    this.deathBenefitGrantPeriodId = props.deathBenefitGrantPeriodId;
  }
}
