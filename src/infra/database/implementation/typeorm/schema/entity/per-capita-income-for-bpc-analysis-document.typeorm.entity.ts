import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';

@Entity({ name: 'per_capita_income_for_bpc_analysis_document' })
export class PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum,
  })
  public type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum;

  @ManyToOne(() => PerCapitaIncomeForBpcAnalysisTypeormEntity)
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_id' })
  public perCapitaIncomeForBpcAnalysis?:
    | PerCapitaIncomeForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity.name;
}
