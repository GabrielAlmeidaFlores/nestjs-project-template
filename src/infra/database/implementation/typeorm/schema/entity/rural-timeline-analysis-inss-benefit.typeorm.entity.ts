import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';

@Entity({ name: 'rural_timeline_inss_benefit' })
export class RuralTimelineAnalysisInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit_number', type: 'varchar', length: 100 })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => RuralTimelineAnalysisTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisInssBenefitTypeormEntity.name;
}
