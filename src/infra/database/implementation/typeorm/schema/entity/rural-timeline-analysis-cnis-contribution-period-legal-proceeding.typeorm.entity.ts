import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';

@Entity({ name: 'rural_timeline_cnis_contribution_period_legal_proceeding' })
export class RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) => entity.legalProceedings,
  )
  @JoinColumn({ name: 'rural_timeline_cnis_contribution_period_id' })
  public ruralTimelineCnisContributionPeriod:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLegalProceedingTypeormEntity.name;
}
