import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/value-object/death-benefit-rejection-dependent-document-id.value-object';

import type { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import type { DeathBenefitRejectionDependentDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity.props.interface';

export class DeathBenefitRejectionDependentDocumentEntity extends BaseEntity<DeathBenefitRejectionDependentDocumentId> {
  public readonly document: string;
  public readonly deathBenefitRejectionDependentId: DeathBenefitRejectionDependentId;

  protected readonly _type = DeathBenefitRejectionDependentDocumentEntity.name;

  public constructor(
    props: DeathBenefitRejectionDependentDocumentEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionDependentDocumentId, props);
    this.document = props.document;
    this.deathBenefitRejectionDependentId =
      props.deathBenefitRejectionDependentId;
  }
}
