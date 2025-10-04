import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis_client_legal_proceeding' })
export class AnalysisToolClientLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'int',
  })
  public legalProceedingNumber: number;

  @ManyToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.analysisToolClientInssBenefit,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis: CnisFastAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    AnalysisToolClientLegalProceedingTypeormEntity.name;
}
