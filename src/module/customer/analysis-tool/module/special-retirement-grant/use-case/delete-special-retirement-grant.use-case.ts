import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { SpecialRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/special-retirement-grant.query.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { DeleteSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/delete-special-retirement-grant.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteSpecialRetirementGrantUseCase {
  protected readonly _type = DeleteSpecialRetirementGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantQueryRepositoryGateway)
    private readonly specialRetirementGrantQueryRepositoryGateway: SpecialRetirementGrantQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantCommandRepositoryGateway)
    private readonly specialRetirementGrantCommandRepositoryGateway: SpecialRetirementGrantCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<DeleteSpecialRetirementGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const specialRetirementGrant =
      await this.specialRetirementGrantQueryRepositoryGateway.findOneBySpecialRetirementGrantIdAndOrganizationIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        SpecialRetirementGrantNotFoundError,
      );

    const deleteTransaction =
      this.specialRetirementGrantCommandRepositoryGateway.deleteSpecialRetirementGrant(
        specialRetirementGrant.id,
        organizationMember.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteTransaction,
    ]);
    await transaction.commit();

    return DeleteSpecialRetirementGrantResponseDto.build({
      specialRetirementGrantId: specialRetirementGrant.id,
    });
  }
}
