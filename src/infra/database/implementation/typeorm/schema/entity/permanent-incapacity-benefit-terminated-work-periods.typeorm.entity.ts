import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';

@Entity({ name: 'permanent_incapacity_benefit_terminated_work_periods' })
export class PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

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

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  public category: PermanentIncapacityBenefitTerminatedCategoryEnum | null;

  @Column({ name: 'activity_description', type: 'text', nullable: true })
  public activityDescription: string | null;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public pendencyReason: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public periodConsideration: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({ name: 'impact_months', type: 'int', nullable: true })
  public impactMonths: number | null;

  @Column({ name: 'grace_period', type: 'int', nullable: true })
  public gracePeriod: number | null;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({
    name: 'wants_to_complement_via_meu_inss',
    type: 'boolean',
    nullable: true,
  })
  public wantsToComplementViaMeuINSS: boolean | null;

  @Column({ name: 'status', type: 'boolean' })
  public status: boolean;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedTypeormEntity,
    (entity) => entity.workPeriods,
  )
  @JoinColumn({ name: 'permanent_incapacity_benefit_terminated_id' })
  public permanentIncapacityBenefitTerminated?: PermanentIncapacityBenefitTerminatedTypeormEntity;

  @OneToMany(
    () =>
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminatedWorkPeriods,
  )
  public earningsHistory?: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity[];

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity.name;
}
