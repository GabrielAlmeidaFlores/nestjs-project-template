import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/value-object/death-benefit-rejection-legal-representative-id.value-object';

export interface DeathBenefitRejectionLegalRepresentativeEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionLegalRepresentativeId> {
  name?: string | null;
  cpf?: PersonalDocument | null;
  birthDate?: Date | null;
  isMinorUnderGuardianship?: boolean | null;
  legalRepresentativeRelationship?: string | null;
  deathBenefitRejectionId: DeathBenefitRejectionId;
}
