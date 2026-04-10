import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInstitorEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity.props.interface';

export class DeathBenefitGrantInstitorEntity extends BaseEntity<DeathBenefitGrantInstitorId> {
  public readonly name: string | null;
  public readonly cpf: PersonalDocument | null;
  public readonly birthDate: Date | null;
  public readonly gender: GenderEnum | null;
  public readonly deathDate: Date | null;
  public readonly wasRetired: boolean | null;
  public readonly retirementBenefitNumber: string | null;
  public readonly isDeathDeclarantChildOrSpouse: boolean | null;
  public readonly deathDeclarantRelationshipDescription: string | null;
  public readonly wantsToProveWorkPeriodNotInCnis: boolean | null;
  public readonly wasRuralInsured: boolean | null;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly ruralPeriodDocumentDescription: string | null;
  public readonly wasUnemployedAtDeath: boolean | null;
  public readonly wantsToProveDisabilityBeforeDeath: boolean | null;
  public readonly wantsToProveUnemploymentByWitness: boolean | null;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantInstitorEntity.name;

  public constructor(props: DeathBenefitGrantInstitorEntityPropsInterface) {
    super(DeathBenefitGrantInstitorId, props);
    this.name = props.name ?? null;
    this.cpf = props.cpf ?? null;
    this.birthDate = props.birthDate ?? null;
    this.gender = props.gender ?? null;
    this.deathDate = props.deathDate ?? null;
    this.wasRetired = props.wasRetired ?? null;
    this.retirementBenefitNumber = props.retirementBenefitNumber ?? null;
    this.isDeathDeclarantChildOrSpouse =
      props.isDeathDeclarantChildOrSpouse ?? null;
    this.deathDeclarantRelationshipDescription =
      props.deathDeclarantRelationshipDescription ?? null;
    this.wantsToProveWorkPeriodNotInCnis =
      props.wantsToProveWorkPeriodNotInCnis ?? null;
    this.wasRuralInsured = props.wasRuralInsured ?? null;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.ruralPeriodDocumentDescription =
      props.ruralPeriodDocumentDescription ?? null;
    this.wasUnemployedAtDeath = props.wasUnemployedAtDeath ?? null;
    this.wantsToProveDisabilityBeforeDeath =
      props.wantsToProveDisabilityBeforeDeath ?? null;
    this.wantsToProveUnemploymentByWitness =
      props.wantsToProveUnemploymentByWitness ?? null;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
