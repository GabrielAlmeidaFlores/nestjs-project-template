import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';

@Entity({ name: 'rural_timeline_period_document' })
export class RuralTimelineAnalysisPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document_year',
    type: 'int',
    nullable: true,
  })
  public documentYear?: number | null;

  @Column({
    name: 'document_holder_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public documentHolderType?: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum | null;

  @Column({
    name: 'self_owned',
    type: 'boolean',
    nullable: true,
  })
  public selfOwned?: boolean | null;

  @Column({
    name: 'probatory_purpose',
    type: 'text',
    nullable: true,
  })
  public probatoryPurpose?: string | null;

  @Column({
    name: 'analyzed_at',
    type: 'timestamp',
    nullable: true,
    transformer: DateTransformer,
  })
  public analyzedAt?: Date | null;

  @Column({
    name: 'document',
    type: 'text',
  })
  public document: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 100,
  })
  public type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  @ManyToOne(
    () => RuralTimelineAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralTimelinePeriodDocument,
  )
  @JoinColumn({ name: 'rural_timeline_period_id' })
  public ruralTimelinePeriod?:
    | RuralTimelineAnalysisPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisPeriodDocumentTypeormEntity.name;
}
