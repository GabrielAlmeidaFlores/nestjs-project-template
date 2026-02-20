import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';

@Entity({ name: 'rural_timeline_document' })
export class RuralTimelineAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
  })
  public type: RuralTimelineAnalysisDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'text',
  })
  public document: string;

  @Column({
    name: 'custom_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public customType: string | null;

  @ManyToOne(
    () => RuralTimelineAnalysisTypeormEntity,
    (entity) => entity.ruralTimelineDocument,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisDocumentTypeormEntity.name;
}
