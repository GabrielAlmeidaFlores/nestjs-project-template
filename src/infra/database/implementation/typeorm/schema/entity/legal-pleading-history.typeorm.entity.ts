import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { LegalPleadingHistoryTitleEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/enum/legal-pleading-history-title.enum';

@Entity('legal_pleading_history')
export class LegalPleadingHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'title',
    type: 'simple-enum',
    enum: LegalPleadingHistoryTitleEnum,
  })
  public title: LegalPleadingHistoryTitleEnum;

  @Column({ name: 'description', type: 'text' })
  public description: string;

  @ManyToOne(
    () => LegalPleadingTypeormEntity,
    (entity) => entity.legalPleadingHistory,
  )
  @JoinColumn({ name: 'legal_pleading_id' })
  public legalPleading: LegalPleadingTypeormEntity | undefined;

  protected override readonly _type = LegalPleadingHistoryTypeormEntity.name;
}
