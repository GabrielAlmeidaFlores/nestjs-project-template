import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { OrganizationCreditPlanPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.typeorm.entity';
import { OrganizationTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/organization/organization/organization.typeorm.entity.props.interface';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization-member/organization-member.typeorm.entity';

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

  protected readonly _type = OrganizationTypeormEntity.name;

  public constructor(props?: OrganizationTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.name = props.name;
    this.organizationLogo = props.organizationLogo;
    this.organizationMember = props.organizationMember;
    this.organizationCreditPlanPurchase = props.organizationCreditPlanPurchase;
  }
}
