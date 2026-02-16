import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';

@Entity({ name: 'insurance_quality_analysis_legal_proceeding' })
export class InsuranceQualityAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => InsuranceQualityAnalysisTypeormEntity,
    (entity) => entity.insuranceQualityAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'insurance_quality_analysis_id' })
  public insuranceQualityAnalysis:
    | InsuranceQualityAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    InsuranceQualityAnalysisLegalProceedingTypeormEntity.name;
}
