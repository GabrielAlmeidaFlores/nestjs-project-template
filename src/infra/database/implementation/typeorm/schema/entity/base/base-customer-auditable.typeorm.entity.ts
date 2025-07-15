import { JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';

export abstract class BaseCustomerAuditableTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => CustomerTypeormEntity)
  @JoinColumn({
    name: 'created_by_id',
  })
  public createdBy: CustomerTypeormEntity | undefined;

  @ManyToOne(() => CustomerTypeormEntity)
  @JoinColumn({
    name: 'updated_by_id',
  })
  public updatedBy: CustomerTypeormEntity | undefined;
}
