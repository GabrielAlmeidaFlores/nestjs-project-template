import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({
  name: 'full_opinion_generator_analysis',
})
export class FullOpinionGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'full_opinion_generator_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public fullOpinionGeneratorCompleteAnalysis: string | null;

  @Column({
    name: 'full_opinion_generator_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public fullOpinionGeneratorSimplifiedAnalysis: string | null;

  protected override readonly _type = FullOpinionGeneratorTypeormEntity.name;
}
