import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_grant_period_overdue_contribution' })
export class SpecialRetirementGrantPeriodOverdueContributionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'overdue_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public overdueDate: Date;

  @Column({
    name: 'payment_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public paymentDate: Date | null;

  @ManyToOne(
    () => SpecialRetirementGrantPeriodTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriodOverdueContribution,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'special_retirement_grant_period_id' })
  public specialRetirementGrantPeriod?:
    | SpecialRetirementGrantPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantPeriodOverdueContributionTypeormEntity.name;
}
