import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

import type { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_inss_benefit' })
export class MaternityPayRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public inssBenefit: string | null;

  @ManyToOne(
    'MaternityPayRejectionTypeormEntity',
    'maternityPayRejectionInssBenefit',
    { eager: false },
  )
  @JoinColumn({ name: 'maternity_pay_rejection_id' })
  public maternityPayRejection?: MaternityPayRejectionTypeormEntity;

  protected override readonly _type =
    MaternityPayRejectionInssBenefitTypeormEntity.name;
}
