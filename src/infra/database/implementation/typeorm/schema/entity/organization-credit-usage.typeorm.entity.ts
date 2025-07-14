import { Column, JoinColumn, ManyToOne } from 'typeorm';

import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { BaseAuditableTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base-auditable.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

export class OrganizationCreditUsageTypeormEntity extends BaseAuditableTypeormEntity {
  @Column({ name: 'credit_amount', type: 'number' })
  public creditAmount: number;

  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationCreditPurchase,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity | undefined;

  @ManyToOne(
    () => ApplicationPaidResourceTypeormEntity,
    (entity) => entity.applicationPaidResource,
  )
  @JoinColumn({ name: 'paid_resource_id' })
  public applicationPaidResource:
    | ApplicationPaidResourceTypeormEntity
    | undefined;

  protected override readonly _type = OrganizationCreditUsageTypeormEntity.name;
}
