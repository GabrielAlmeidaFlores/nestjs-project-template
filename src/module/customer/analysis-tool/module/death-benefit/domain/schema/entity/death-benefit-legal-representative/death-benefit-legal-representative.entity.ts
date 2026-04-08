import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/value-object/death-benefit-legal-representative-id.value-object';

import type { DeathBenefitLegalRepresentativeEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/death-benefit-legal-representative.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

export class DeathBenefitLegalRepresentativeEntity extends BaseEntity<DeathBenefitLegalRepresentativeId> {
  public readonly name: string | null;
  public readonly cpf: string | null;
  public readonly birthDate: Date | null;
  public readonly isMinorUnderGuardianship: boolean | null;
  public readonly legalRepresentativeRelationship: string | null;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitLegalRepresentativeEntity.name;

  public constructor(
    props: DeathBenefitLegalRepresentativeEntityPropsInterface,
  ) {
    super(DeathBenefitLegalRepresentativeId, props);
    this.name = props.name ?? null;
    this.cpf = props.cpf ?? null;
    this.birthDate = props.birthDate ?? null;
    this.isMinorUnderGuardianship = props.isMinorUnderGuardianship ?? null;
    this.legalRepresentativeRelationship =
      props.legalRepresentativeRelationship ?? null;
    this.deathBenefitId = props.deathBenefitId;
  }
}
