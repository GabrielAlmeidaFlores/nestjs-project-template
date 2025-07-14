import { JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';

export abstract class BaseAuditableTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => CustomerTypeormEntity)
  @JoinColumn({
    name: 'created_by',
  })
  public createdBy: CustomerTypeormEntity | undefined;

  @ManyToOne(() => CustomerTypeormEntity)
  @JoinColumn({
    name: 'updated_by',
  })
  public updatedBy: CustomerTypeormEntity | undefined;
}
