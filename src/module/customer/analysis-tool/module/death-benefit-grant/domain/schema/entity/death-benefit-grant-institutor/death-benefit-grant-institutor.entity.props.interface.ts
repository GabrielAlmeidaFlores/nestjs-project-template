import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

export interface DeathBenefitGrantInstitorEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantInstitorId> {
  name?: string | null;
  cpf?: PersonalDocument | null;
  birthDate?: Date | null;
  gender?: GenderEnum | null;
  deathDate?: Date | null;
  wasRetired?: boolean | null;
  retirementBenefitNumber?: string | null;
  isDeathDeclarantChildOrSpouse?: boolean | null;
  deathDeclarantRelationshipDescription?: string | null;
  wantsToProveWorkPeriodNotInCnis?: boolean | null;
  wasRuralInsured?: boolean | null;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  ruralPeriodDocumentDescription?: string | null;
  wasUnemployedAtDeath?: boolean | null;
  wantsToProveDisabilityBeforeDeath?: boolean | null;
  wantsToProveUnemploymentByWitness?: boolean | null;
  deathBenefitGrantId: DeathBenefitGrantId;
}
