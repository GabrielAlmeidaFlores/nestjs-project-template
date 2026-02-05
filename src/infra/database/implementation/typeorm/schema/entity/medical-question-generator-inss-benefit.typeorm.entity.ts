import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';

@Entity({ name: 'medical_question_generator_inss_benefit' })
export class MedicalQuestionGeneratorInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => MedicalQuestionGeneratorTypeormEntity,
    (entity) => entity.medicalQuestionGeneratorInssBenefit,
  )
  @JoinColumn({ name: 'medical_question_generator_id' })
  public medicalQuestionGenerator:
    | MedicalQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalQuestionGeneratorInssBenefitTypeormEntity.name;
}
