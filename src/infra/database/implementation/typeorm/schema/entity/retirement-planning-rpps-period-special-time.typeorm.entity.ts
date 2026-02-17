import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';

@Entity({ name: 'retirement_planning_rpps_period_special_time' })
export class RetirementPlanningRppsPeriodSpecialTimeTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPlanningPeriodSpecialTimeTypeEnum,
    nullable: false,
  })
  public type: RetirementPlanningPeriodSpecialTimeTypeEnum;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public endDate: Date;

  @OneToMany(
    () => RetirementPlanningRppsPeriodDocumentTypeormEntity,
    (entity) => entity.retirementPlanningRppsPeriodSpecialTime,
  )
  public specialTimeDocuments?:
    | RetirementPlanningRppsPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => RetirementPlanningRppsPeriodTypeormEntity,
    (entity) => entity.specialTimePeriod,
  )
  @JoinColumn({ name: 'retirement_planning_rpps_period_id' })
  public retirementPlanningRppsPeriod?:
    | RetirementPlanningRppsPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsPeriodSpecialTimeTypeormEntity.name;
}
