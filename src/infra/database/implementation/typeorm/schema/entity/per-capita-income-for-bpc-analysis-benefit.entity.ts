import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';

@Entity({ name: 'per_capita_income_for_bpc_analysis_benefit' })
export class PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => PerCapitaIncomeForBpcAnalysisTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysisBenefit,
  )
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_id' })
  public perCapitaIncomeForBpcAnalysis:
    | PerCapitaIncomeForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity.name;
}
