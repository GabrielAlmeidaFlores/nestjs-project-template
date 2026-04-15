import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_result' })
export class RuralOrHybridRetirementRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'second_analysis', type: 'longtext', nullable: true })
  public secondAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @Column({ name: 'complete_analysis_download', type: 'longtext', nullable: true })
  public completeAnalysisDownload: string | null;

  @Column({ name: 'simplified_analysis_download', type: 'longtext', nullable: true })
  public simplifiedAnalysisDownload: string | null;

  @OneToOne(
    () => RuralOrHybridRetirementRejectionTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionResult,
  )
  public ruralOrHybridRetirementRejection?:
    | RuralOrHybridRetirementRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionResultTypeormEntity.name;
}
