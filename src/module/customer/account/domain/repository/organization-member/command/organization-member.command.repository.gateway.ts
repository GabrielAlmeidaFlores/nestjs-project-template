import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';

export abstract class OrganizationMemberCommandRepositoryGateway {
  public abstract createOrganizationMember(
    props: OrganizationMemberEntity,
  ): TransactionType;
}
