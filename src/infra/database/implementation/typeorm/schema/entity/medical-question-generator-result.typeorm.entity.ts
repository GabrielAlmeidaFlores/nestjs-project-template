import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';

@Entity({ name: 'medical_question_generator_result' })
export class MedicalQuestionGeneratorResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'medical_question_generator_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public medicalQuestionGeneratorCompleteAnalysis: string | null;

  @Column({
    name: 'medical_question_generator_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public medicalQuestionGeneratorSimplifiedAnalysis: string | null;

  @OneToOne(
    () => MedicalQuestionGeneratorTypeormEntity,
    (entity) => entity.medicalQuestionGeneratorResult,
  )
  public medicalQuestionGenerator?:
    | MedicalQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalQuestionGeneratorResultTypeormEntity.name;
}
