import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';

@Entity({ name: 'per_capita_income_for_bpc_analysis_legal_proceeding' })
export class PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => PerCapitaIncomeForBpcAnalysisTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_id' })
  public perCapitaIncomeForBpcAnalysis:
    | PerCapitaIncomeForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity.name;
}
