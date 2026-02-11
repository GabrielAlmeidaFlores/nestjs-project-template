import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';

@Entity({ name: 'speech_generator_benefit' })
export class SpeechGeneratorBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => SpeechGeneratorTypeormEntity,
    (entity) => entity.speechGeneratorBenefit,
  )
  @JoinColumn({ name: 'speech_generator_id' })
  public speechGenerator?: SpeechGeneratorTypeormEntity | undefined;

  protected override readonly _type =
    SpeechGeneratorBenefitTypeormEntity.name;
}
