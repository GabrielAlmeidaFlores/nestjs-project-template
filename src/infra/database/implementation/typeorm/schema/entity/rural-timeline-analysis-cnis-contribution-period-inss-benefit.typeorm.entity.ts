import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';

@Entity({ name: 'rural_timeline_cnis_contribution_period_inss_benefit' })
export class RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'rural_timeline_cnis_contribution_period_id' })
  public ruralTimelineCnisContributionPeriod:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity.name;
}
