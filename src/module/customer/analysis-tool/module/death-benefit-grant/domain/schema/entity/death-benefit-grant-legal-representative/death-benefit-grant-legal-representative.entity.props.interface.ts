import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/value-object/death-benefit-grant-legal-representative-id.value-object';

export interface DeathBenefitGrantLegalRepresentativeEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantLegalRepresentativeId> {
  name?: string | null;
  cpf?: string | null;
  birthDate?: Date | null;
  isMinorUnderGuardianship?: boolean | null;
  legalRepresentativeRelationship?: string | null;
  deathBenefitGrantId: DeathBenefitGrantId;
}
