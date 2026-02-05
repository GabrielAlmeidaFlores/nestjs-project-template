import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';

@Entity({ name: 'medical_question_generator' })
export class MedicalQuestionGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'disability_date', type: 'date', nullable: true })
  public disabilityDate?: Date | null;

  @OneToOne(
    () => MedicalQuestionGeneratorResultTypeormEntity,
    (entity) => entity.medicalQuestionGenerator,
  )
  @JoinColumn({ name: 'medical_question_generator_result_id' })
  public medicalQuestionGeneratorResult?:
    | MedicalQuestionGeneratorResultTypeormEntity
    | undefined;

  @OneToMany(
    () => MedicalQuestionGeneratorInssBenefitTypeormEntity,
    (entity) => entity.medicalQuestionGenerator,
  )
  public medicalQuestionGeneratorInssBenefit?:
    | MedicalQuestionGeneratorInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MedicalQuestionGeneratorLegalProceedingTypeormEntity,
    (entity) => entity.medicalQuestionGenerator,
  )
  public medicalQuestionGeneratorLegalProceeding?:
    | MedicalQuestionGeneratorLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MedicalQuestionGeneratorDocumentTypeormEntity,
    (entity) => entity.medicalQuestionGenerator,
  )
  public medicalQuestionGeneratorDocument?:
    | MedicalQuestionGeneratorDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.medicalQuestionGenerator,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  protected override readonly _type =
    MedicalQuestionGeneratorTypeormEntity.name;
}
