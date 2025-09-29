import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis_client_legal_proceeding' })
export class CnisFastAnalysisClientLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'int',
  })
  public legalProceedingNumber: number;

  @OneToOne(
    () => CnisFastAnalysisClientTypeormEntity,
    (entity) => entity.cnisFastAnalysisClientLegalProceeding,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_client_id' })
  public cnisFastAnalysisClient?:
    | CnisFastAnalysisClientTypeormEntity
    | undefined;

  protected override readonly _type =
    CnisFastAnalysisClientLegalProceedingTypeormEntity.name;
}
