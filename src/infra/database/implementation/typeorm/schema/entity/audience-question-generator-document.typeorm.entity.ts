import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'audience_question_generator_document' })
export class AudienceQuestionGeneratorDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @ManyToOne(() => AudienceQuestionGeneratorTypeormEntity)
  @JoinColumn({ name: 'audience_question_generator_id' })
  public audienceQuestionGenerator?:
    | AudienceQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    AudienceQuestionGeneratorDocumentTypeormEntity.name;
}
