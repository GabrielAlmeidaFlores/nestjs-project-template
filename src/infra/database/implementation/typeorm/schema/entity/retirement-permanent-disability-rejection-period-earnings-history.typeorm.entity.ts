import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'retirement_permanent_disability_rejection_period_earnings_hist',
})
export class RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
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
    () => RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRejectionPeriodEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_permanent_disability_rejection_period_id' })
  public retirementPermanentDisabilityRejectionPeriod?: RetirementPermanentDisabilityRejectionPeriodTypeormEntity | null;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity.name;
}
