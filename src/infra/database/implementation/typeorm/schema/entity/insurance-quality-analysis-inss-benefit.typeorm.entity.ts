import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';

@Entity({ name: 'insurance_quality_analysis_inss_benefit' })
export class InsuranceQualityAnalysisInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => InsuranceQualityAnalysisTypeormEntity,
    (entity) => entity.insuranceQualityAnalysisInssBenefit,
  )
  @JoinColumn({ name: 'insurance_quality_analysis_id' })
  public insuranceQualityAnalysis:
    | InsuranceQualityAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    InsuranceQualityAnalysisInssBenefitTypeormEntity.name;
}
