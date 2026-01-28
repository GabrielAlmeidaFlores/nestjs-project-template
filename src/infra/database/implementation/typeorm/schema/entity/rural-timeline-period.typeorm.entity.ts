import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelinePeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-document.typeorm.entity';
import { RuralTimelinePeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-economic-aspects.typeorm.entity';
import { RuralTimelinePeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-family-group-member.typeorm.entity';
import { RuralTimelinePeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-property.typeorm.entity';
import { RuralTimelinePeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-residence.typeorm.entity';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/production-destination.enum';
import { RuralTimelinePeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/rural-timeline-period-work-regime-type.enum';
import { RuralTimelinePeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/rural-timeline-period-worker-type.enum';

@Entity({ name: 'rural_timeline_period' })
export class RuralTimelinePeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
  })
  public endDate: Date;

  @Column({
    name: 'worker_type',
    type: 'varchar',
    length: 50,
  })
  public workerType: RuralTimelinePeriodWorkerTypeEnum;

  @Column({
    name: 'work_regime_type',
    type: 'varchar',
    length: 50,
  })
  public workRegimeType: RuralTimelinePeriodWorkRegimeTypeEnum;

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
    () => RuralTimelineTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineTypeormEntity | undefined;

  @OneToOne(
    () => RuralTimelinePeriodPropertyTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'rural_timeline_period_property_id' })
  public ruralTimelinePeriodProperty?:
    | RuralTimelinePeriodPropertyTypeormEntity
    | undefined;

  @OneToOne(
    () => RuralTimelinePeriodResidenceTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'rural_timeline_period_residence_id' })
  public ruralTimelinePeriodResidence?:
    | RuralTimelinePeriodResidenceTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralTimelinePeriodDocumentTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  public ruralTimelinePeriodDocument?:
    | RuralTimelinePeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelinePeriodEconomicAspectsTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  public ruralTimelinePeriodEconomicAspects?:
    | RuralTimelinePeriodEconomicAspectsTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelinePeriodFamilyGroupMemberTypeormEntity,
    (entity) => entity.ruralTimelinePeriod,
  )
  public ruralTimelinePeriodFamilyGroupMember?:
    | RuralTimelinePeriodFamilyGroupMemberTypeormEntity[]
    | undefined;

  protected override readonly _type = RuralTimelinePeriodTypeormEntity.name;
}
