import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';

@Entity({ name: 'retirement_permanent_disability_revision_work_periods' })
export class RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'bond_origin',
    type: 'varchar',
    length: 255,
  })
  public bondOrigin: string;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
  })
  public category: string;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
  })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'status',
    type: 'boolean',
  })
  public status: boolean;

  @Column({
    name: 'grace_period',
    type: 'int',
  })
  public gracePeriod: number;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionWorkPeriods,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_permanent_disability_revision_id' })
  public retirementPermanentDisabilityRevision?: RetirementPermanentDisabilityRevisionTypeormEntity | null;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionWorkPeriods,
  )
  public retirementPermanentDisabilityRevisionWorkPeriodsEarningsHistory?:
    | RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity.name;
}
