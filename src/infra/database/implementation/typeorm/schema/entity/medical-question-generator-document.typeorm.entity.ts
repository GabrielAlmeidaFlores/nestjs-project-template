import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';

@Entity({ name: 'medical_question_generator_document' })
export class MedicalQuestionGeneratorDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: MedicalQuestionGeneratorDocumentTypeEnum,
  })
  public type: MedicalQuestionGeneratorDocumentTypeEnum;

  @ManyToOne(
    () => MedicalQuestionGeneratorTypeormEntity,
    (entity) => entity.medicalQuestionGeneratorDocument,
  )
  @JoinColumn({ name: 'medical_question_generator_id' })
  public medicalQuestionGenerator?:
    | MedicalQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalQuestionGeneratorDocumentTypeormEntity.name;
}
