import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitBenefitInstitorId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/value-object/death-benefit-benefit-institutor-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitBenefitInstitorEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/death-benefit-benefit-institutor.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

export class DeathBenefitBenefitInstitorEntity extends BaseEntity<DeathBenefitBenefitInstitorId> {
  public readonly name: string | null;
  public readonly cpf: string | null;
  public readonly birthDate: Date | null;
  public readonly sex: GenderEnum | null;
  public readonly deathDate: Date | null;
  public readonly wasRetired: boolean | null;
  public readonly retirementBenefitNumber: string | null;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitBenefitInstitorEntity.name;

  public constructor(props: DeathBenefitBenefitInstitorEntityPropsInterface) {
    super(DeathBenefitBenefitInstitorId, props);
    this.name = props.name ?? null;
    this.cpf = props.cpf ?? null;
    this.birthDate = props.birthDate ?? null;
    this.sex = props.sex ?? null;
    this.deathDate = props.deathDate ?? null;
    this.wasRetired = props.wasRetired ?? null;
    this.retirementBenefitNumber = props.retirementBenefitNumber ?? null;
    this.deathBenefitId = props.deathBenefitId;
  }
}
