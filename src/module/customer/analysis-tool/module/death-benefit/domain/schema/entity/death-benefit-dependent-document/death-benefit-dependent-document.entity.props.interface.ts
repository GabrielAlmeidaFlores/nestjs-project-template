import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import type { DeathBenefitDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/value-object/death-benefit-dependent-document-id.value-object';

export interface DeathBenefitDependentDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitDependentDocumentId> {
  document: string;
  deathBenefitDependentId: DeathBenefitDependentId;
}
