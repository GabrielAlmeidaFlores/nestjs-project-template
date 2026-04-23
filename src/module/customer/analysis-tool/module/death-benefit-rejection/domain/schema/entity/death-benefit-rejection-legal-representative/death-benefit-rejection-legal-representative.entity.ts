import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/value-object/death-benefit-rejection-legal-representative-id.value-object';

import type { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionLegalRepresentativeEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity.props.interface';

export class DeathBenefitRejectionLegalRepresentativeEntity extends BaseEntity<DeathBenefitRejectionLegalRepresentativeId> {
  public readonly name: string | null;
  public readonly cpf: PersonalDocument | null;
  public readonly birthDate: Date | null;
  public readonly isMinorUnderGuardianship: boolean | null;
  public readonly legalRepresentativeRelationship: string | null;
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;

  protected readonly _type =
    DeathBenefitRejectionLegalRepresentativeEntity.name;

  public constructor(
    props: DeathBenefitRejectionLegalRepresentativeEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionLegalRepresentativeId, props);
    this.name = props.name ?? null;
    this.cpf = props.cpf ?? null;
    this.birthDate = props.birthDate ?? null;
    this.isMinorUnderGuardianship = props.isMinorUnderGuardianship ?? null;
    this.legalRepresentativeRelationship =
      props.legalRepresentativeRelationship ?? null;
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
  }
}
