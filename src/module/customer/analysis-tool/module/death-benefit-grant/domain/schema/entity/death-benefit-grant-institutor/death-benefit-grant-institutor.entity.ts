import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInstitorEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity.props.interface';

export class DeathBenefitGrantInstitorEntity extends BaseEntity<DeathBenefitGrantInstitorId> {
  public readonly name: string | null;
  public readonly cpf: string | null;
  public readonly birthDate: Date | null;
  public readonly sex: GenderEnum | null;
  public readonly deathDate: Date | null;
  public readonly wasRetired: boolean | null;
  public readonly retirementBenefitNumber: string | null;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantInstitorEntity.name;

  public constructor(props: DeathBenefitGrantInstitorEntityPropsInterface) {
    super(DeathBenefitGrantInstitorId, props);
    this.name = props.name ?? null;
    this.cpf = props.cpf ?? null;
    this.birthDate = props.birthDate ?? null;
    this.sex = props.sex ?? null;
    this.deathDate = props.deathDate ?? null;
    this.wasRetired = props.wasRetired ?? null;
    this.retirementBenefitNumber = props.retirementBenefitNumber ?? null;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
