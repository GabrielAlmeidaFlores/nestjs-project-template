import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({
  name: 'initial_petition_generator_analysis',
})
export class InitialPetitionGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'initial_petition_generator_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public initialPetitionGeneratorCompleteAnalysis: string | null;

  @Column({
    name: 'initial_petition_generator_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public initialPetitionGeneratorSimplifiedAnalysis: string | null;

  protected override readonly _type =
    InitialPetitionGeneratorTypeormEntity.name;
}
