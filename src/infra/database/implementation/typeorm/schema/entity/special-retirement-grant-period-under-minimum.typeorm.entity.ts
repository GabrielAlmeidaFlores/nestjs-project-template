import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_grant_period_under_minimum' })
export class SpecialRetirementGrantPeriodUnderMinimumTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'contribution_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public contributionDate: Date;

  @Column({
    name: 'contribution_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public contributionAmount: string;

  @ManyToOne(
    () => SpecialRetirementGrantPeriodTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriodUnderMinimum,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'special_retirement_grant_period_id' })
  public specialRetirementGrantPeriod?:
    | SpecialRetirementGrantPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantPeriodUnderMinimumTypeormEntity.name;
}
