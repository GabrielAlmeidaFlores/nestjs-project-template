import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_result' })
export class RuralOrHybridRetirementAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'second_analysis', type: 'longtext', nullable: true })
  public secondAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @Column({
    name: 'simplified_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public simplifiedAnalysisDownload: string | null;

  @OneToOne(
    () => RuralOrHybridRetirementAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisResult,
  )
  public ruralOrHybridRetirementAnalysis?:
    | RuralOrHybridRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisResultTypeormEntity.name;
}
