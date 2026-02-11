import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';

@Entity({ name: 'audience_question_generator_legal_proceeding' })
export class AudienceQuestionGeneratorLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => AudienceQuestionGeneratorTypeormEntity,
    (entity) => entity.audienceQuestionGeneratorLegalProceeding,
  )
  @JoinColumn({ name: 'audience_question_generator_id' })
  public audienceQuestionGenerator: AudienceQuestionGeneratorTypeormEntity | undefined;

  protected override readonly _type =
    AudienceQuestionGeneratorLegalProceedingTypeormEntity.name;
}
