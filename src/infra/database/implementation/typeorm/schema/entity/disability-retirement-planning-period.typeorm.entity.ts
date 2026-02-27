import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';

@Entity({ name: 'disability_retirement_planning_period' })
export class DisabilityRetirementPlanningPeriodTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type =
    DisabilityRetirementPlanningPeriodTypeormEntity.name;

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

  @Column({ name: 'job_position', type: 'varchar', length: 255 })
  public jobPosition: string;

  @Column({ name: 'career_name', type: 'varchar', length: 255 })
  public careerName: string;

  @Column({ name: 'service_type', type: 'simple-enum', enum: RetirementPlanningPeriodServiceTypeEnum })
  public serviceType: RetirementPlanningPeriodServiceTypeEnum;

  @Column({ name: 'department', type: 'varchar', length: 255 })
  public department: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriod,
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;

  @OneToMany(
    () => DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriod,
  )
  public disabilityRetirementPlanningPeriodDisability?: DisabilityRetirementPlanningPeriodDisabilityTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriod,
  )
  public disabilityRetirementPlanningPeriodSpecialTime?: DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity[];
}
