import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'disability_retirement_planning_rejection_period_earnings_history',
})
export class DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public competence: Date | null;

  @Column({ name: 'value', type: 'varchar', length: 255, nullable: true })
  public value: string | null;

  @ManyToOne(
    () => DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
    (entity) =>
      entity.disabilityRetirementPlanningRejectionPeriodEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_period_id' })
  public disabilityRetirementPlanningRejectionPeriod?: DisabilityRetirementPlanningRejectionPeriodTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity.name;
}
