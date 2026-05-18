import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';

@Entity({ name: 'bpc_disability_denial_result' })
export class BpcDisabilityDenialResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_decision_analysis', type: 'text', nullable: true })
  public inssDecisionAnalysis: string | null;

  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public simplifiedAnalysis: string | null;

  @Column({ name: 'applicable_rules', type: 'longtext', nullable: true })
  public applicableRules: string | null;

  @Column({ name: 'benefit_summaries', type: 'longtext', nullable: true })
  public benefitSummaries: string | null;

  @Column({ name: 'analysis_detailed_text', type: 'longtext', nullable: true })
  public analysisDetailedText: string | null;

  @OneToOne(() => BpcDisabilityDenialTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_denial_id' })
  public bpcDisabilityDenial?: BpcDisabilityDenialTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityDenialResultTypeormEntity.name;
}
