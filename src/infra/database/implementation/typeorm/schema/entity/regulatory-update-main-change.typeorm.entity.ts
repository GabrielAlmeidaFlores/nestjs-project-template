import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RegulatoryUpdateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update.typeorm.entity';

@Entity({ name: 'regulatory_update_main_change' })
export class RegulatoryUpdateMainChangeTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'description', type: 'text' })
  public description: string;

  @Column({ name: 'order', type: 'int', default: 0 })
  public order: number;

  @ManyToOne(() => RegulatoryUpdateTypeormEntity, (ru) => ru.mainChanges, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'regulatory_update_id' })
  public regulatoryUpdate: RegulatoryUpdateTypeormEntity;

  protected override readonly _type = RegulatoryUpdateMainChangeTypeormEntity.name;
}
