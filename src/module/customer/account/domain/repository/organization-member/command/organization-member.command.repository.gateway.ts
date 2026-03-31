import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export abstract class OrganizationMemberCommandRepositoryGateway {
  public abstract createOrganizationMember(
    props: OrganizationMemberEntity,
  ): TransactionType;

  public abstract updateOrganizationMemberStatus(
    id: OrganizationMemberId,
    isActive: boolean,
  ): TransactionType;

  public abstract deleteOrganizationMember(
    id: OrganizationMemberId,
  ): TransactionType;
}
