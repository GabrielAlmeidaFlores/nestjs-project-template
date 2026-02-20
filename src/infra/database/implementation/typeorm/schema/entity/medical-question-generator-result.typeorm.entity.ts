import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'medical_question_generator_result' })
export class MedicalQuestionGeneratorResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'client_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientName: string | null;

  @Column({
    name: 'client_federal_document',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
    nullable: true,
  })
  public clientFederalDocument: string | null;

  @Column({
    name: 'client_birth_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public clientBirthDate: Date | null;

  @Column({
    name: 'client_last_affiliation_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public clientLastAffiliationDate: Date | null;

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
