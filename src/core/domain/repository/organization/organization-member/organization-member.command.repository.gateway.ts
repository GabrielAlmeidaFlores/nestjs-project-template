import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';
import type { OrganizationMemberEntity } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity';

export abstract class OrganizationMemberCommandRepositoryGateway {
  public abstract createOrganizationMember(
    props: OrganizationMemberEntity,
  ): TransactionEventType;
}
