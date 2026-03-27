import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'regulatory_update_monitored_source' })
export class RegulatoryUpdateMonitoredSourceTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({ name: 'url', type: 'varchar', length: 500 })
  public url: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  public active: boolean;

  protected override readonly _type =
    RegulatoryUpdateMonitoredSourceTypeormEntity.name;
}
