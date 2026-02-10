import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';

@Entity({ name: 'speech_generator_result' })
export class SpeechGeneratorResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'speech_generator_complete_content',
    type: 'longtext',
    nullable: true,
  })
  public speechGeneratorCompleteContent: string | null;

  @Column({
    name: 'speech_generator_simplified_content',
    type: 'text',
    nullable: true,
  })
  public speechGeneratorSimplifiedContent: string | null;

  @OneToOne(
    () => SpeechGeneratorTypeormEntity,
    (entity) => entity.speechGeneratorResult,
  )
  public speechGenerator?: SpeechGeneratorTypeormEntity | undefined;

  protected override readonly _type = SpeechGeneratorResultTypeormEntity.name;
}
