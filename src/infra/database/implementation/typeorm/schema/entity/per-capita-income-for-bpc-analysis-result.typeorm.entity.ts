import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';

@Entity({ name: 'per_capita_income_for_bpc_analysis_result' })
export class PerCapitaIncomeForBpcAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'complete_analysis', type: 'text', nullable: true })
  public perCapitaIncomeForBpcCompleteAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public perCapitaIncomeForBpcSimplifiedAnalysis: string | null;

  @OneToOne(() => PerCapitaIncomeForBpcAnalysisTypeormEntity)
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_id' })
  public perCapitaIncomeForBpcAnalysis?:
    | PerCapitaIncomeForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisResultTypeormEntity.name;
}
