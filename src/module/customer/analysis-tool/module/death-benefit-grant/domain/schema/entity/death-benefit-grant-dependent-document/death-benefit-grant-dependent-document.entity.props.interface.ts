import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import type { DeathBenefitGrantDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/value-object/death-benefit-grant-dependent-document-id.value-object';

export interface DeathBenefitGrantDependentDocumentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantDependentDocumentId> {
  document: string;
  deathBenefitGrantDependentId: DeathBenefitGrantDependentId;
}
