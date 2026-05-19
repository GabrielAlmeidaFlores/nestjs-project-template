import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_benefit_rejection_inss_benefit' })
export class AccidentBenefitRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public inssBenefit: string | null;

  @ManyToOne(
    () => AccidentBenefitRejectionTypeormEntity,
    (entity) => entity.accidentBenefitRejectionInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_id' })
  public accidentBenefitRejection?: AccidentBenefitRejectionTypeormEntity | null;

  protected override readonly _type =
    AccidentBenefitRejectionInssBenefitTypeormEntity.name;
}
