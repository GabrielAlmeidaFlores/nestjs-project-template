import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/value-object/death-benefit-legal-representative-id.value-object';

export interface DeathBenefitLegalRepresentativeEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitLegalRepresentativeId> {
  name?: string | null;
  cpf?: string | null;
  birthDate?: Date | null;
  isMinorUnderGuardianship?: boolean | null;
  legalRepresentativeRelationship?: string | null;
  deathBenefitId: DeathBenefitId;
}
