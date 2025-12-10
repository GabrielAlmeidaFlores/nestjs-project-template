import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';

@Entity({ name: 'cid' })
export class CidTenTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'code',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  public code: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  public description: string;

  @OneToMany(
    () => RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    (entity) => entity.cid,
  )
  public retirementPlanningRppsPeriodDisability?:
    | RetirementPlanningRppsPeriodDisabilityTypeormEntity[]
    | undefined;

  protected override readonly _type = CidTenTypeormEntity.name;
}
