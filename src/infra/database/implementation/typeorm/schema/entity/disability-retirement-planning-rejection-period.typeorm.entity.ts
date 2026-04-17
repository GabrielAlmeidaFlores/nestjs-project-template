import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-earnings-history.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';

@Entity({ name: 'disability_retirement_planning_rejection_period' })
export class DisabilityRetirementPlanningRejectionPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionPeriodCategoryEnum,
    nullable: true,
  })
  public category: DisabilityRetirementPlanningRejectionPeriodCategoryEnum | null;

  @Column({ name: 'activity_description', type: 'text', nullable: true })
  public activityDescription: string | null;

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
    name: 'work_type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum,
  })
  public workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;

  @Column({ name: 'impact_months', type: 'int', nullable: true })
  public impactMonths: number | null;

  @Column({ name: 'grace_months', type: 'int', nullable: true })
  public graceMonths: number | null;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum | null;

  @Column({
    name: 'wants_to_complement_via_meu_inss',
    type: 'boolean',
    nullable: true,
  })
  public wantsToComplementViaMeuINSS: boolean | null;

  @Column({ name: 'status', type: 'boolean' })
  public status: boolean;

  @Column({
    name: 'pcd_status',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum,
    nullable: true,
  })
  public pcdStatus: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum | null;

  @ManyToOne(
    () => DisabilityRetirementPlanningRejectionTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_id' })
  public disabilityRetirementPlanningRejection?: DisabilityRetirementPlanningRejectionTypeormEntity | null;

  @OneToMany(
    () => DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionPeriod,
  )
  public disabilityRetirementPlanningRejectionPeriodDocument?: DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity[];

  @OneToMany(
    () =>
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionPeriod,
  )
  public disabilityRetirementPlanningRejectionPeriodEarningsHistory?: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity[];

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionPeriodTypeormEntity.name;
}
