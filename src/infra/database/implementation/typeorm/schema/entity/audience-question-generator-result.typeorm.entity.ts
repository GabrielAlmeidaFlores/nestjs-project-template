import { Column, Entity, OneToOne } from 'typeorm';

import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'audience_question_generator_result' })
export class AudienceQuestionGeneratorResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'audience_question_generator_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public audienceQuestionGeneratorCompleteAnalysis: string | null;

  @Column({
    name: 'audience_question_generator_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public audienceQuestionGeneratorSimplifiedAnalysis: string | null;

  @OneToOne(
    () => AudienceQuestionGeneratorTypeormEntity,
    (entity) => entity.audienceQuestionGeneratorResult,
  )
  public audienceQuestionGenerator?:
    | AudienceQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    AudienceQuestionGeneratorResultTypeormEntity.name;
}
