import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis_client_inss_benefit' })
export class CnisFastAnalysisClientInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'int',
  })
  public inssBenefitNumber: number;

  @OneToOne(
    () => CnisFastAnalysisClientTypeormEntity,
    (entity) => entity.cnisFastAnalysisClientInssBenefit,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_client_id' })
  public cnisFastAnalysisClient?:
    | CnisFastAnalysisClientTypeormEntity
    | undefined;

  protected override readonly _type =
    CnisFastAnalysisClientInssBenefitTypeormEntity.name;
}
