import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';

@Entity({ name: 'temporary_incapacity_benefit_rejection_work_periods' })
export class TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity extends BaseTypeormEntity {
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
  public category: TemporaryIncapacityBenefitRejectionCategoryEnum | null;

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
  public pendencyReason: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public periodConsideration: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum | null;

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
    () => TemporaryIncapacityBenefitRejectionTypeormEntity,
    (entity) => entity.workPeriods,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_rejection_id' })
  public temporaryIncapacityBenefitRejection?: TemporaryIncapacityBenefitRejectionTypeormEntity;

  @OneToMany(
    () =>
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejectionWorkPeriods,
  )
  public earningsHistory?: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity[];

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity.name;
}
