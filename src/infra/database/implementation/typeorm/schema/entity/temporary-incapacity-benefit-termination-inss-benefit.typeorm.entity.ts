import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';

@Entity({ name: 'temporary_incapacity_benefit_termination_inss_benefit' })
export class TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => TemporaryIncapacityBenefitTerminationTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_termination_id' })
  public temporaryIncapacityBenefitTermination?: TemporaryIncapacityBenefitTerminationTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity.name;
}
