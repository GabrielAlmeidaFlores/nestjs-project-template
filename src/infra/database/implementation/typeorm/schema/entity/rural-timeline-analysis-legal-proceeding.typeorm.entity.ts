import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';

@Entity({ name: 'rural_timeline_legal_proceeding' })
export class RuralTimelineAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => RuralTimelineAnalysisTypeormEntity,
    (entity) => entity.ruralTimelineAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'rural_timeline_analysis_id' })
  public ruralTimelineAnalysis: RuralTimelineAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisLegalProceedingTypeormEntity.name;
}
