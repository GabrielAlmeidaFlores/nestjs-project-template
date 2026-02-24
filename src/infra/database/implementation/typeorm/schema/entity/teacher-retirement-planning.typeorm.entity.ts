import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-document.typeorm.entity';
import { TeacherRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-legal-proceeding.typeorm.entity';
import { TeacherRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period.typeorm.entity';
import { TeacherRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-remuneration.typeorm.entity';
import { TeacherRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';

@Entity({ name: 'teacher_retirement_planning' })
export class TeacherRetirementPlanningTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'federative_entity',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningFederativeEntityEnum,
    nullable: false,
  })
  public federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 2,
    nullable: true,
  })
  public state: string | null;

  @Column({
    name: 'municipality',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public municipality: string | null;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'activity_type',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningActivityTypeEnum,
    nullable: false,
  })
  public activityType: TeacherRetirementPlanningActivityTypeEnum;

  @Column({
    name: 'public_service_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public publicServiceStartDate: Date;

  @Column({
    name: 'career_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public careerStartDate: Date;

  @OneToOne(
    () => TeacherRetirementPlanningResultTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
    { nullable: true },
  )
  @JoinColumn({ name: 'teacher_retirement_planning_result_id' })
  public result?: TeacherRetirementPlanningResultTypeormEntity | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningInssBenefitTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
  )
  public inssBenefits?: TeacherRetirementPlanningInssBenefitTypeormEntity[];

  @OneToMany(
    () => TeacherRetirementPlanningLegalProceedingTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
  )
  public legalProceedings?: TeacherRetirementPlanningLegalProceedingTypeormEntity[];

  @OneToMany(
    () => TeacherRetirementPlanningDocumentTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
  )
  public documents?: TeacherRetirementPlanningDocumentTypeormEntity[];

  @OneToMany(
    () => TeacherRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
  )
  public periods?: TeacherRetirementPlanningPeriodTypeormEntity[];

  @OneToMany(
    () => TeacherRetirementPlanningRemunerationTypeormEntity,
    (entity) => entity.teacherRetirementPlanning,
  )
  public remunerations?: TeacherRetirementPlanningRemunerationTypeormEntity[];

  protected override readonly _type = TeacherRetirementPlanningTypeormEntity.name;
}
