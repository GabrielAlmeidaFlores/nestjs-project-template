import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-economic-aspects.typeorm.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';

@Entity({ name: 'rural_timeline_period' })
export class RuralTimelineAnalysisPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
  })
  public startDate?: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
  })
  public endDate?: Date | null;

  @Column({
    name: 'worker_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public workerType?: RuralTimelineAnalysisPeriodWorkerTypeEnum | null;

  @Column({
    name: 'work_regime_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public workRegimeType?: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum | null;

  @Column({
    name: 'production_destination',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public productionDestination?: ProductionDestinationEnum | null;

  @Column({
    name: 'document_analysis',
    type: 'text',
    nullable: true,
  })
  public documentAnalysis?: string | null;

  @ManyToOne(
    () => RuralTimelineAnalysisTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineAnalysisTypeormEntity | undefined;

  @OneToOne(
    () => RuralTimelineAnalysisPeriodPropertyTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'rural_timeline_period_property_id' })
  public ruralTimelinePeriodProperty?:
    | RuralTimelineAnalysisPeriodPropertyTypeormEntity
    | undefined;

  @OneToOne(
    () => RuralTimelineAnalysisPeriodResidenceTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'rural_timeline_period_residence_id' })
  public ruralTimelinePeriodResidence?:
    | RuralTimelineAnalysisPeriodResidenceTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisPeriodDocumentTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  public ruralTimelinePeriodDocument?:
    | RuralTimelineAnalysisPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  public ruralTimelinePeriodEconomicAspects?:
    | RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  public ruralTimelinePeriodFamilyGroupMember?:
    | RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisPeriodTypeormEntity.name;
}
