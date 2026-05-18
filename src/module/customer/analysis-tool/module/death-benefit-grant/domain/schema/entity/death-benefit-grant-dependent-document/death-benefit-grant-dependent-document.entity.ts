import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/value-object/death-benefit-grant-dependent-document-id.value-object';

import type { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import type { DeathBenefitGrantDependentDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity.props.interface';

export class DeathBenefitGrantDependentDocumentEntity extends BaseEntity<DeathBenefitGrantDependentDocumentId> {
  public readonly document: string;
  public readonly deathBenefitGrantDependentId: DeathBenefitGrantDependentId;

  protected readonly _type = DeathBenefitGrantDependentDocumentEntity.name;

  public constructor(
    props: DeathBenefitGrantDependentDocumentEntityPropsInterface,
  ) {
    super(DeathBenefitGrantDependentDocumentId, props);
    this.document = props.document;
    this.deathBenefitGrantDependentId = props.deathBenefitGrantDependentId;
  }
}
