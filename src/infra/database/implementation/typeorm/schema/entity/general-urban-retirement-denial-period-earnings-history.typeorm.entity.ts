import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_denial_period_earnings_history' })
export class GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
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
    () => GeneralUrbanRetirementDenialPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialPeriodEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_period_id' })
  public generalUrbanRetirementDenialPeriod?: GeneralUrbanRetirementDenialPeriodTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity.name;
}
