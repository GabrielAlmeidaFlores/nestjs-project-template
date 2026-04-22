import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/value-object/death-benefit-rejection-document-id.value-object';

import type { DeathBenefitRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity.props.interface';
import type { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';
import type { DeathBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-document-type.enum';

export class DeathBenefitRejectionDocumentEntity extends BaseEntity<DeathBenefitRejectionDocumentId> {
  public readonly document: string;
  public readonly type: DeathBenefitRejectionDocumentTypeEnum;
  public readonly deathBenefitRejectionInstitorId: DeathBenefitRejectionInstitorId;

  protected readonly _type = DeathBenefitRejectionDocumentEntity.name;

  public constructor(props: DeathBenefitRejectionDocumentEntityPropsInterface) {
    super(DeathBenefitRejectionDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.deathBenefitRejectionInstitorId =
      props.deathBenefitRejectionInstitorId;
  }
}
