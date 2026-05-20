import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'poverty_declaration_generator_analysis' })
export class PovertyDeclarationGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'poverty_declaration_generator_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public povertyDeclarationGeneratorCompleteAnalysis: string | null;

  protected override readonly _type =
    PovertyDeclarationGeneratorTypeormEntity.name;
}
