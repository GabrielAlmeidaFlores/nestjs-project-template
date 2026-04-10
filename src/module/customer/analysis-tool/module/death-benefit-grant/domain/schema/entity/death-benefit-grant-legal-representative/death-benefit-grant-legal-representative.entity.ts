import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/value-object/death-benefit-grant-legal-representative-id.value-object';

import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantLegalRepresentativeEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity.props.interface';

export class DeathBenefitGrantLegalRepresentativeEntity extends BaseEntity<DeathBenefitGrantLegalRepresentativeId> {
  public readonly name: string | null;
  public readonly cpf: string | null;
  public readonly birthDate: Date | null;
  public readonly isMinorUnderGuardianship: boolean | null;
  public readonly legalRepresentativeRelationship: string | null;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantLegalRepresentativeEntity.name;

  public constructor(
    props: DeathBenefitGrantLegalRepresentativeEntityPropsInterface,
  ) {
    super(DeathBenefitGrantLegalRepresentativeId, props);
    this.name = props.name ?? null;
    this.cpf = props.cpf ?? null;
    this.birthDate = props.birthDate ?? null;
    this.isMinorUnderGuardianship = props.isMinorUnderGuardianship ?? null;
    this.legalRepresentativeRelationship =
      props.legalRepresentativeRelationship ?? null;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
