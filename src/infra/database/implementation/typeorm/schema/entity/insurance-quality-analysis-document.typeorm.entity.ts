import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { InsuranceQualityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/enum/insurance-quality-analysis-document-type.enum';

@Entity({ name: 'insurance_quality_analysis_document' })
export class InsuranceQualityAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: InsuranceQualityAnalysisDocumentTypeEnum,
  })
  public type: InsuranceQualityAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => InsuranceQualityAnalysisTypeormEntity,
    (
      entity: InsuranceQualityAnalysisTypeormEntity,
    ): InsuranceQualityAnalysisDocumentTypeormEntity[] | undefined =>
      entity.insuranceQualityAnalysisDocument,
  )
  @JoinColumn({ name: 'insurance_quality_analysis_id' })
  public insuranceQualityAnalysis?:
    | InsuranceQualityAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    InsuranceQualityAnalysisDocumentTypeormEntity.name;
}
