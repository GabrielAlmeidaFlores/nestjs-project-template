import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis_client_inss_benefit' })
export class AnalysisToolClientInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'int',
  })
  public inssBenefitNumber: number;

  @ManyToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.cnisFastAnalysisClientInssBenefit,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis: CnisFastAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    AnalysisToolClientInssBenefitTypeormEntity.name;
}
