import { Column, Entity, OneToMany } from 'typeorm';

import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationCreditPlanPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-plan-purchase.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'organization' })
export class OrganizationTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'organization_logo', type: 'varchar', length: 50 })
  public organizationLogo: string;

  @OneToMany(
    () => OrganizationMemberTypeormEntity,
    (entity) => entity.organization,
  )
  public organizationMember: OrganizationMemberTypeormEntity[] | undefined;

  @OneToMany(
    () => OrganizationCreditPlanPurchaseTypeormEntity,
    (entity) => entity.organization,
  )
  public organizationCreditPlanPurchase:
    | OrganizationCreditPlanPurchaseTypeormEntity[]
    | undefined;

  @OneToMany(
    () => OrganizationCreditPurchaseTypeormEntity,
    (entity) => entity.organization,
  )
  public organizationCreditPurchase:
    | OrganizationCreditPurchaseTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AvailablePaymentPlanTypeormEntity,
    (entity) => entity.organization,
  )
  public availablePaymentPlan: AvailablePaymentPlanTypeormEntity[] | undefined;

  protected override readonly _type = OrganizationTypeormEntity.name;
}
