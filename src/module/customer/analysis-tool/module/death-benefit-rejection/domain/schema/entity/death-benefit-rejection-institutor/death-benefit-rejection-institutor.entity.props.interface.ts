import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import type { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

export interface DeathBenefitRejectionInstitorEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionInstitorId> {
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
  deathBenefitRejectionId: DeathBenefitRejectionId;
  deathBenefitRejectionDocument?: DeathBenefitRejectionDocumentEntity[] | null;
}
