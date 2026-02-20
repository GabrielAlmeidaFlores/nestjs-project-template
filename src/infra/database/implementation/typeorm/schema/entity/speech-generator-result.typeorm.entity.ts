import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'speech_generator_result' })
export class SpeechGeneratorResultTypeormEntity extends BaseTypeormEntity {
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
