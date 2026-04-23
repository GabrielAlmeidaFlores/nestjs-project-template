import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-document.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-earnings-history.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { AccidentBenefitRejectionWorkPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-consideration.enum';
import { AccidentBenefitRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-job-type.enum';

@Entity({ name: 'accident_benefit_rejection_work_period' })
export class AccidentBenefitRejectionWorkPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'bond_origin',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public bondOrigin: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public startDate: Date | null;

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
    length: 255,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({
    name: 'pendency_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public pendencyReason: string | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: AccidentBenefitRejectionWorkPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: AccidentBenefitRejectionWorkPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public status: string | null;

  @Column({
    name: 'grace_period',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public gracePeriod: string | null;

  @Column({
    name: 'job_type',
    type: 'simple-enum',
    enum: AccidentBenefitRejectionWorkPeriodJobTypeEnum,
    nullable: true,
  })
  public jobType: AccidentBenefitRejectionWorkPeriodJobTypeEnum | null;

  @Column({
    name: 'activity_description',
    type: 'longtext',
    nullable: true,
  })
  public activityDescription: string | null;

  @ManyToOne(
    () => AccidentBenefitRejectionTypeormEntity,
    (entity) => entity.accidentBenefitRejectionWorkPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_id' })
  public accidentBenefitRejection?: AccidentBenefitRejectionTypeormEntity | null;

  @OneToMany(
    () => AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity,
    (entity) => entity.accidentBenefitRejectionWorkPeriod,
  )
  public accidentBenefitRejectionWorkPeriodDocument?:
    | AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.accidentBenefitRejectionWorkPeriod,
  )
  public accidentBenefitRejectionWorkPeriodEarningsHistory?:
    | AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type =
    AccidentBenefitRejectionWorkPeriodTypeormEntity.name;
}
