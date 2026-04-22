import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import type { DeathBenefitRejectionInstitorEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity.props.interface';

export class DeathBenefitRejectionInstitorEntity extends BaseEntity<DeathBenefitRejectionInstitorId> {
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
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;
  public readonly deathBenefitRejectionDocument:
    | DeathBenefitRejectionDocumentEntity[]
    | null;

  protected readonly _type = DeathBenefitRejectionInstitorEntity.name;

  public constructor(props: DeathBenefitRejectionInstitorEntityPropsInterface) {
    super(DeathBenefitRejectionInstitorId, props);
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
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
    this.deathBenefitRejectionDocument =
      props.deathBenefitRejectionDocument ?? null;
  }
}
