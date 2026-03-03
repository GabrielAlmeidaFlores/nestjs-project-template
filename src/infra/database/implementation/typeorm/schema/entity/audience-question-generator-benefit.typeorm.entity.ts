import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'audience_question_generator_benefit' })
export class AudienceQuestionGeneratorBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => AudienceQuestionGeneratorTypeormEntity,
    (entity) => entity.audienceQuestionGeneratorBenefit,
  )
  @JoinColumn({ name: 'audience_question_generator_id' })
  public audienceQuestionGenerator:
    | AudienceQuestionGeneratorTypeormEntity
    | undefined;

  protected override readonly _type =
    AudienceQuestionGeneratorBenefitTypeormEntity.name;
}
