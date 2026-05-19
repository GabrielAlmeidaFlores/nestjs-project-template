import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/enum/reason-pendency.enum';

@Entity({ name: 'general_urban_retirement_grant_period' })
export class GeneralUrbanRetirementGrantPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'period_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public periodName: string | null;

  @Column({
    name: 'period_start',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodStart: Date | null;

  @Column({
    name: 'period_end',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodEnd: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'is_pendency',
    type: 'boolean',
    nullable: true,
  })
  public isPendency: boolean | null;

  @Column({
    name: 'reason_pendency',
    type: 'simple-enum',
    enum: ReasonPendencyEnum,
    nullable: true,
  })
  public reasonPendency: ReasonPendencyEnum | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'type_of_contribution',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public typeOfContribution: string | null;

  @ManyToOne(
    () => GeneralUrbanRetirementGrantTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrantPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_grant_id' })
  public generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantTypeormEntity | null;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: true,
  })
  public status: boolean | null;

  protected override readonly _type =
    GeneralUrbanRetirementGrantPeriodTypeormEntity.name;
}
