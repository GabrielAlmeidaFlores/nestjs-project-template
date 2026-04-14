import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_grant_period_pending_exit_date' })
export class SpecialRetirementGrantPeriodPendingExitDateTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'pending_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public pendingDate: Date;

  @Column({
    name: 'pending_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public pendingAmount: string;

  @ManyToOne(
    () => SpecialRetirementGrantPeriodTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriodPendingExitDate,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'special_retirement_grant_period_id' })
  public specialRetirementGrantPeriod?:
    | SpecialRetirementGrantPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantPeriodPendingExitDateTypeormEntity.name;
}
