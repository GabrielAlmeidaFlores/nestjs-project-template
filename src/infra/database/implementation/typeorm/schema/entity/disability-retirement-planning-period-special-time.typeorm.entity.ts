import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

@Entity({ name: 'disability_retirement_planning_period_special_time' })
export class DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity extends BaseTypeormEntity {
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
    name: 'special_period_type',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityTimeTypeEnum,
  })
  public specialPeriodType: RetirementPlanningDisabilityTimeTypeEnum;

  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodSpecialTime,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_id' })
  public disabilityRetirementPlanningPeriod?: DisabilityRetirementPlanningPeriodTypeormEntity;

  @OneToMany(
    () => DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningPeriodSpecialTime,
  )
  public disabilityRetirementPlanningPeriodSpecialTimeDocument?: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity[];

  protected override readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity.name;
}
