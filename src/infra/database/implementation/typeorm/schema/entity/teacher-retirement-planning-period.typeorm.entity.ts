import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';

@Entity({ name: 'teacher_retirement_planning_period' })
export class TeacherRetirementPlanningPeriodTypeormEntity extends BaseTypeormEntity {
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

  @Column({
    name: 'position_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public positionName: string;

  @Column({
    name: 'career_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public careerName: string;

  @Column({
    name: 'service_type',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningPeriodServiceTypeEnum,
    nullable: false,
  })
  public serviceType: TeacherRetirementPlanningPeriodServiceTypeEnum;

  @Column({
    name: 'department',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public department: string;

  @ManyToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.periods,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_id' })
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity;

  @OneToMany(
    () => TeacherRetirementPlanningPeriodItemTypeormEntity,
    (entity) => entity.teacherRetirementPlanningPeriod,
  )
  public items?: TeacherRetirementPlanningPeriodItemTypeormEntity[];

  protected override readonly _type =
    TeacherRetirementPlanningPeriodTypeormEntity.name;
}
