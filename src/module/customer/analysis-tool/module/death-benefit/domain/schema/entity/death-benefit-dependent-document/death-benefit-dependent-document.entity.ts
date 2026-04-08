import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/value-object/death-benefit-dependent-document-id.value-object';

import type { DeathBenefitDependentDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/death-benefit-dependent-document.entity.props.interface';
import type { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';

export class DeathBenefitDependentDocumentEntity extends BaseEntity<DeathBenefitDependentDocumentId> {
  public readonly document: string;
  public readonly deathBenefitDependentId: DeathBenefitDependentId;

  protected readonly _type = DeathBenefitDependentDocumentEntity.name;

  public constructor(props: DeathBenefitDependentDocumentEntityPropsInterface) {
    super(DeathBenefitDependentDocumentId, props);
    this.document = props.document;
    this.deathBenefitDependentId = props.deathBenefitDependentId;
  }
}
