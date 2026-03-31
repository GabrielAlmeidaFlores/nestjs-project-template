import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';

@Entity({ name: 'affiliate_customer_config' })
export class AffiliateCustomerConfigTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'config',
    type: 'enum',
    enum: AffiliateCustomerConfigConfigEnum,
    unique: true,
  })
  public config: AffiliateCustomerConfigConfigEnum;

  @Column({ name: 'value', type: 'varchar', length: 255 })
  public value: string;

  protected override readonly _type = AffiliateCustomerConfigTypeormEntity.name;
}
