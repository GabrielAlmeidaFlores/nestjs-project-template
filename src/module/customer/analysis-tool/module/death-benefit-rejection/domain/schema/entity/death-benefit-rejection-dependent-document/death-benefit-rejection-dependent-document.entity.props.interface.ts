import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import type { DeathBenefitRejectionDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/value-object/death-benefit-rejection-dependent-document-id.value-object';

export interface DeathBenefitRejectionDependentDocumentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionDependentDocumentId> {
  document: string;
  deathBenefitRejectionDependentId: DeathBenefitRejectionDependentId;
}
