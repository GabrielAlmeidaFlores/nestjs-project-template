import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';

@Entity({ name: 'insurance_quality_analysis_result' })
export class InsuranceQualityAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'insurance_quality_conclusion',
    type: 'text',
    nullable: true,
  })
  public insuranceQualityConclusion: string | null;

  @Column({
    name: 'grace_period_conclusion',
    type: 'text',
    nullable: true,
  })
  public gracePeriodConclusion: string | null;

  @Column({
    name: 'final_recommendation',
    type: 'text',
    nullable: true,
  })
  public finalRecommendation: string | null;

  @Column({
    name: 'analysis_summary',
    type: 'text',
    nullable: true,
  })
  public analysisSummary: string | null;

  @OneToOne(
    () => InsuranceQualityAnalysisTypeormEntity,
    (entity) => entity.insuranceQualityAnalysisResult,
    { nullable: true },
  )
  @JoinColumn({ name: 'insurance_quality_analysis_id' })
  public insuranceQualityAnalysis?:
    | InsuranceQualityAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    InsuranceQualityAnalysisResultTypeormEntity.name;
}
