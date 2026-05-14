import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';

@Entity({ name: 'permanent_incapacity_benefit_terminated_inss_benefit' })
export class PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'permanent_incapacity_benefit_terminated_id' })
  public permanentIncapacityBenefitTerminated?: PermanentIncapacityBenefitTerminatedTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity.name;
}
