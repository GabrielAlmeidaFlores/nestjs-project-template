import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_grant_earnings_history' })
export class GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity extends BaseTypeormEntity {
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

  @Column({
    name: 'contribution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contribution: string | null;

  @Column({
    name: 'contribution_salary',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionSalary: string | null;

  @Column({
    name: 'analysis',
    type: 'longtext',
    nullable: true,
  })
  public analysis: string | null;

  @ManyToOne(() => GeneralUrbanRetirementGrantPeriodTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'general_urban_retirement_grant_period_id' })
  public generalUrbanRetirementGrantPeriod?: GeneralUrbanRetirementGrantPeriodTypeormEntity | null;

  @ManyToOne(() => GeneralUrbanRetirementGrantTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'general_urban_retirement_grant_id' })
  public generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantTypeormEntity | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  protected override readonly _type =
    GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity.name;
}
