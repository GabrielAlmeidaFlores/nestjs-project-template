import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'fee_contract_generator_analysis' })
export class FeeContractGeneratorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'fee_contract_generator_complete_analysis', type: 'text', nullable: true })
  public feeContractGeneratorCompleteAnalysis: string | null;

  protected override readonly _type = FeeContractGeneratorTypeormEntity.name;
}
