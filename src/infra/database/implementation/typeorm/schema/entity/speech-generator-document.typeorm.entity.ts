import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SpeechGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/enum/speech-generator-document-type.enum';

@Entity({ name: 'speech_generator_document' })
export class SpeechGeneratorDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: SpeechGeneratorDocumentTypeEnum,
  })
  public type: SpeechGeneratorDocumentTypeEnum;

  @ManyToOne(
    () => SpeechGeneratorTypeormEntity,
    (entity) => entity.speechGeneratorDocument,
  )
  @JoinColumn({ name: 'speech_generator_id' })
  public speechGenerator?: SpeechGeneratorTypeormEntity | undefined;

  protected override readonly _type = SpeechGeneratorDocumentTypeormEntity.name;
}
