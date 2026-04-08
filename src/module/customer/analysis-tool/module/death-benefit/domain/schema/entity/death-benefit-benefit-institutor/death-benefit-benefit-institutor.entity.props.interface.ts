import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitBenefitInstitorId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/value-object/death-benefit-benefit-institutor-id.value-object';

export interface DeathBenefitBenefitInstitorEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitBenefitInstitorId> {
  name?: string | null;
  cpf?: string | null;
  birthDate?: Date | null;
  sex?: GenderEnum | null;
  deathDate?: Date | null;
  wasRetired?: boolean | null;
  retirementBenefitNumber?: string | null;
  deathBenefitId: DeathBenefitId;
}
