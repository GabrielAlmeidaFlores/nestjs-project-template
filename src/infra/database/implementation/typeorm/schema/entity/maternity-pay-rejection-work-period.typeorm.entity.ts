import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { MaternityPayRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-job-type.enum';
import { MaternityPayRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-period-consideration.enum';

import type { MaternityPayRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-document.typeorm.entity';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-earnings-history.typeorm.entity';
import type { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_work_period' })
export class MaternityPayRejectionWorkPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
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

  @Column({ name: 'category', type: 'varchar', length: 255, nullable: true })
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
    enum: MaternityPayRejectionWorkPeriodPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: MaternityPayRejectionWorkPeriodPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({ name: 'status', type: 'varchar', length: 255, nullable: true })
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
    enum: MaternityPayRejectionWorkPeriodJobTypeEnum,
    nullable: true,
  })
  public jobType: MaternityPayRejectionWorkPeriodJobTypeEnum | null;

  @Column({ name: 'activity_description', type: 'longtext', nullable: true })
  public activityDescription: string | null;

  @ManyToOne(
    'MaternityPayRejectionTypeormEntity',
    'maternityPayRejectionWorkPeriod',
    { eager: false },
  )
  @JoinColumn({ name: 'maternity_pay_rejection_id' })
  public maternityPayRejection?: MaternityPayRejectionTypeormEntity;

  @OneToMany(
    'MaternityPayRejectionWorkPeriodDocumentTypeormEntity',
    'maternityPayRejectionWorkPeriod',
    { eager: false },
  )
  public maternityPayRejectionWorkPeriodDocument?: MaternityPayRejectionWorkPeriodDocumentTypeormEntity[];

  @OneToMany(
    'MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity',
    'maternityPayRejectionWorkPeriod',
    { eager: false },
  )
  public maternityPayRejectionWorkPeriodEarningsHistory?: MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity[];

  protected override readonly _type =
    MaternityPayRejectionWorkPeriodTypeormEntity.name;
}
