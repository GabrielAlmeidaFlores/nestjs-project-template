import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_grant_earnings_history' })
export class SpecialRetirementGrantEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public competence: Date | null;

  @Column({
    name: 'remuneration',
    type: 'longtext',
    nullable: true,
  })
  public remuneration: string | null;

  @Column({
    name: 'indicators',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public paymentDate: Date | null;

  @ManyToOne(() => SpecialRetirementGrantPeriodTypeormEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'special_retirement_grant_period_id' })
  public specialRetirementGrantPeriod?: SpecialRetirementGrantPeriodTypeormEntity | null;

  @ManyToOne(() => SpecialRetirementGrantTypeormEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant?: SpecialRetirementGrantTypeormEntity | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  protected override readonly _type =
    SpecialRetirementGrantEarningsHistoryTypeormEntity.name;
}
