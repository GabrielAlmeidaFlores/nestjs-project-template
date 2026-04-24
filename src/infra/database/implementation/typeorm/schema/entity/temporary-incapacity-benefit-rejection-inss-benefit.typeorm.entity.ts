import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';

@Entity({ name: 'temporary_incapacity_benefit_rejection_inss_benefit' })
export class TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => TemporaryIncapacityBenefitRejectionTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_rejection_id' })
  public temporaryIncapacityBenefitRejection?: TemporaryIncapacityBenefitRejectionTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity.name;
}
