import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { RuralTimelineDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/enum/rural-timeline-document-type.enum';

@Entity({ name: 'rural_timeline_document' })
export class RuralTimelineDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
  })
  public type: RuralTimelineDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'text',
  })
  public document: string;

  @ManyToOne(
    () => RuralTimelineTypeormEntity,
    (entity) => entity.ruralTimelineDocument,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineTypeormEntity | undefined;

  protected override readonly _type = RuralTimelineDocumentTypeormEntity.name;
}
