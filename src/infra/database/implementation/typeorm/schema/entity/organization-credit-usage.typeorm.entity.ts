import { Column, JoinColumn, ManyToOne } from 'typeorm';

import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { BaseAuditableTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base-auditable.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

export class OrganizationCreditUsageTypeormEntity extends BaseAuditableTypeormEntity {
  @Column({ name: 'credit_amount', type: 'number' })
  public creditAmount: number;

  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationCreditPurchase,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity;

  @ManyToOne(
    () => ApplicationPaidResourceTypeormEntity,
    (entity) => entity.applicationPaidResource,
  )
  @JoinColumn({ name: 'paid_resource_id' })
  public applicationPaidResource: ApplicationPaidResourceTypeormEntity;

  @ManyToOne(
    () => CustomerTypeormEntity,
    (entity) => entity.organizationCreditUsage,
  )
  @JoinColumn({ name: 'customer_id' })
  public customer: CustomerTypeormEntity;

  protected override readonly _type = OrganizationCreditUsageTypeormEntity.name;
}
