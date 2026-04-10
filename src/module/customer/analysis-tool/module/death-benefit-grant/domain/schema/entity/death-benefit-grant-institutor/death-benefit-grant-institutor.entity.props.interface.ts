import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

export interface DeathBenefitGrantInstitorEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantInstitorId> {
  name?: string | null;
  cpf?: string | null;
  birthDate?: Date | null;
  sex?: GenderEnum | null;
  deathDate?: Date | null;
  wasRetired?: boolean | null;
  retirementBenefitNumber?: string | null;
  deathBenefitGrantId: DeathBenefitGrantId;
}
