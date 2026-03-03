import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';

@Entity({ name: 'special_activity_documents' })
export class SpecialActivityDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({ name: 'type', type: 'enum', enum: SpecialActivityDocumentTypeEnum })
  public type: SpecialActivityDocumentTypeEnum;

  @ManyToOne(
    () => SpecialActivityTypeormEntity,
    (entity) => entity.specialActivityDocuments,
    { nullable: false },
  )
  @JoinColumn({ name: 'special_activity_id' })
  public specialActivity: SpecialActivityTypeormEntity;

  protected override readonly _type = SpecialActivityDocumentTypeormEntity.name;
}
