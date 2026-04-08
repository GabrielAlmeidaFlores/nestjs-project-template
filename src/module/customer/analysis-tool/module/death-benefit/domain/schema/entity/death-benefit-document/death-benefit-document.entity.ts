import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/value-object/death-benefit-document-id.value-object';

import type { DeathBenefitDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-document-type.enum';

export class DeathBenefitDocumentEntity extends BaseEntity<DeathBenefitDocumentId> {
  public readonly document: string;
  public readonly type: DeathBenefitDocumentTypeEnum;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitDocumentEntity.name;

  public constructor(props: DeathBenefitDocumentEntityPropsInterface) {
    super(DeathBenefitDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.deathBenefitId = props.deathBenefitId;
  }
}
