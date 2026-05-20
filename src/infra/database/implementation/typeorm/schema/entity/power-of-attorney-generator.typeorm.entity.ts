import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'power_of_attorney_generator_analysis' })
export class PowerOfAttorneyGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'power_of_attorney_generator_complete_analysis', type: 'text', nullable: true })
  public powerOfAttorneyGeneratorCompleteAnalysis: string | null;

  protected override readonly _type = PowerOfAttorneyGeneratorTypeormEntity.name;
}
