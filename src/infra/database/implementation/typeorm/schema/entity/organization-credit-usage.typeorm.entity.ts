import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { BaseCustomerAuditableTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base-customer-auditable.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

@Entity({ name: 'organization_credit_usage' })
export class OrganizationCreditUsageTypeormEntity extends BaseCustomerAuditableTypeormEntity {
  @Column({ name: 'credit_amount', type: 'int' })
  public creditAmount: number;

  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationCreditPurchase,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity | undefined;

  @ManyToOne(
    () => ApplicationPaidResourceTypeormEntity,
    (entity) => entity.organizationCreditUsage,
  )
  @JoinColumn({ name: 'application_paid_resource_id' })
  public applicationPaidResource:
    | ApplicationPaidResourceTypeormEntity
    | undefined;

  protected override readonly _type = OrganizationCreditUsageTypeormEntity.name;
}
