import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';

@Entity({ name: 'teacher_retirement_planning_rejection_document' })
export class TeacherRetirementPlanningRejectionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionDocumentTypeEnum,
  })
  public type: TeacherRetirementPlanningRejectionDocumentTypeEnum;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionDocument,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_id' })
  public teacherRetirementPlanningRejection?:
    | TeacherRetirementPlanningRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionDocumentTypeormEntity.name;
}
