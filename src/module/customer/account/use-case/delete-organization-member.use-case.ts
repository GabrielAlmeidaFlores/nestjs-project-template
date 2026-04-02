import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { OrganizationMemberOwnerCannotBeModifiedError } from '@module/customer/account/error/organization-member-owner-cannot-be-modified.error';

@Injectable()
export class DeleteOrganizationMemberUseCase {
  protected readonly _type = DeleteOrganizationMemberUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(OrganizationMemberCommandRepositoryGateway)
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
  ) {}

  public async execute(
    organizationMemberId: OrganizationMemberId,
  ): Promise<void> {
    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneOrganizationMemberById(
        organizationMemberId,
      );

    if (!member) {
      throw new OrganizationMemberNotFoundError();
    }

    if (member.owner) {
      throw new OrganizationMemberOwnerCannotBeModifiedError();
    }

    const deleteTransaction =
      this.organizationMemberCommandRepositoryGateway.deleteOrganizationMember(
        organizationMemberId,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deleteTransaction);

    await transaction.commit();
  }
}
