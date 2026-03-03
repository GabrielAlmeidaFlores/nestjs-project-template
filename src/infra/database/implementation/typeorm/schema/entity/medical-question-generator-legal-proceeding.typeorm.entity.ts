import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';

@Entity({ name: 'medical_question_generator_legal_proceeding' })
export class MedicalQuestionGeneratorLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => MedicalQuestionGeneratorTypeormEntity,
    (entity) => entity.medicalQuestionGeneratorLegalProceeding,
  )
  @JoinColumn({ name: 'medical_question_generator_id' })
  public medicalQuestionGenerator:
    | MedicalQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalQuestionGeneratorLegalProceedingTypeormEntity.name;
}
