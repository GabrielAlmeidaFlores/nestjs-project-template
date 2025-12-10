import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';

@Entity({ name: 'retirement_planning_rpps_period' })
export class RetirementPlanningRppsPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
    nullable: false,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: false,
  })
  public endDate: Date;

  @Column({
    name: 'job_position',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public jobPosition: string;

  @Column({
    name: 'career',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public career: string;

  @Column({
    name: 'service_type',
    type: 'simple-enum',
    nullable: false,
    enum: RetirementPlanningPeriodServiceTypeEnum,
  })
  public serviceType: RetirementPlanningPeriodServiceTypeEnum;

  @Column({
    name: 'department',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public department: string;

  @OneToOne(
    () => RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    (entity) => entity.retirementPlanningRppsPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_time_period_id' })
  public specialTimePeriod?:
    | RetirementPlanningRppsPeriodSpecialTimeTypeormEntity
    | undefined;

  @OneToOne(
    () => RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    (entity) => entity.retirementPlanningRppsPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_period_id' })
  public disabilityPeriod?:
    | RetirementPlanningRppsPeriodDisabilityTypeormEntity
    | undefined;

  @ManyToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.remunerations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_id' })
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsPeriodTypeormEntity.name;
}
