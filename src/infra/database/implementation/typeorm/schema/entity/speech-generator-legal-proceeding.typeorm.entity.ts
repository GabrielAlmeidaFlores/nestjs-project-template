import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';

@Entity({ name: 'speech_generator_legal_proceeding' })
export class SpeechGeneratorLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => SpeechGeneratorTypeormEntity,
    (entity) => entity.speechGeneratorLegalProceeding,
  )
  @JoinColumn({ name: 'speech_generator_id' })
  public speechGenerator?: SpeechGeneratorTypeormEntity | undefined;

  protected override readonly _type =
    SpeechGeneratorLegalProceedingTypeormEntity.name;
}
