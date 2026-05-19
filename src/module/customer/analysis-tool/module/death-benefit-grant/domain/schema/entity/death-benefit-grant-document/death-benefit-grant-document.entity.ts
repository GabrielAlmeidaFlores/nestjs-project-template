import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';

import type { DeathBenefitGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity.props.interface';
import type { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';
import type { DeathBenefitGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-document-type.enum';

export class DeathBenefitGrantDocumentEntity extends BaseEntity<DeathBenefitGrantDocumentId> {
  public readonly document: string;
  public readonly type: DeathBenefitGrantDocumentTypeEnum;
  public readonly deathBenefitGrantInstitorId: DeathBenefitGrantInstitorId;

  protected readonly _type = DeathBenefitGrantDocumentEntity.name;

  public constructor(props: DeathBenefitGrantDocumentEntityPropsInterface) {
    super(DeathBenefitGrantDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.deathBenefitGrantInstitorId = props.deathBenefitGrantInstitorId;
  }
}
