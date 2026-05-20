import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'jef_waiver_declaration_generator_analysis' })
export class JefWaiverDeclarationGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'jef_waiver_declaration_generator_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public jefWaiverDeclarationGeneratorCompleteAnalysis: string | null;

  protected override readonly _type =
    JefWaiverDeclarationGeneratorTypeormEntity.name;
}
