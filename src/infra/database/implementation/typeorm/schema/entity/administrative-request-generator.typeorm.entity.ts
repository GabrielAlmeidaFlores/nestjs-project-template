import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({
  name: 'administrative_request_generator_analysis',
})
export class AdministrativeRequestGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'administrative_request_generator_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public administrativeRequestGeneratorCompleteAnalysis: string | null;

  @Column({
    name: 'administrative_request_generator_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public administrativeRequestGeneratorSimplifiedAnalysis: string | null;

  protected override readonly _type =
    AdministrativeRequestGeneratorTypeormEntity.name;
}
