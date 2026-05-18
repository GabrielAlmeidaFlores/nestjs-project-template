import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item-document.typeorm.entity';
import { TeacherRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';

@Entity({ name: 'teacher_retirement_planning_period_item' })
export class TeacherRetirementPlanningPeriodItemTypeormEntity extends BaseTypeormEntity {
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
    nullable: true,
  })
  public endDate: Date | null;

  @Column({
    name: 'institution_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public institutionName: string | null;

  @Column({
    name: 'institution_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum | null;

  @Column({
    name: 'education_level',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum | null;

  @Column({
    name: 'role_performed',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum | null;

  @ManyToOne(
    () => TeacherRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.items,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_period_id' })
  public teacherRetirementPlanningPeriod?: TeacherRetirementPlanningPeriodTypeormEntity;

  @OneToMany(
    () => TeacherRetirementPlanningPeriodItemDocumentTypeormEntity,
    (entity) => entity.teacherRetirementPlanningPeriodItem,
  )
  public documents?: TeacherRetirementPlanningPeriodItemDocumentTypeormEntity[];

  protected override readonly _type =
    TeacherRetirementPlanningPeriodItemTypeormEntity.name;
}
