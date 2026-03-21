import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { UpdateOrganizationMemberStatusRequestDto } from '@module/customer/account/dto/request/update-organization-member-status.request.dto';
import { UpdateOrganizationMemberStatusResponseDto } from '@module/customer/account/dto/response/update-organization-member-status.response.dto';
import { OrganizationMemberLimitReachedError } from '@module/customer/account/error/organization-member-limit-reached.error';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { OrganizationMemberOwnerCannotBeModifiedError } from '@module/customer/account/error/organization-member-owner-cannot-be-modified.error';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class UpdateOrganizationMemberStatusUseCase {
  protected readonly _type = UpdateOrganizationMemberStatusUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(OrganizationMemberCommandRepositoryGateway)
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepositoryGateway: OrganizationPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    organizationMemberId: OrganizationMemberId,
    dto: UpdateOrganizationMemberStatusRequestDto,
  ): Promise<UpdateOrganizationMemberStatusResponseDto> {
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

    if (dto.isActive) {
      await this.validateMemberLimitForActivation(organizationSessionData);
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.organizationMemberCommandRepositoryGateway.updateOrganizationMemberStatus(
        organizationMemberId,
        dto.isActive,
      ),
    );

    await transaction.commit();

    return UpdateOrganizationMemberStatusResponseDto.build({
      organizationMemberId,
    });
  }

  private async validateMemberLimitForActivation(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<void> {
    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepositoryGateway.findOneByOrganizationId(
        organizationSessionData.organizationId,
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const activeCollaborators =
      await this.organizationMemberQueryRepositoryGateway.countActiveCollaboratorsByOrganizationId(
        organizationSessionData.organizationId,
      );

    if (activeCollaborators >= organizationPaymentPlan.maxMemberCount) {
      throw new OrganizationMemberLimitReachedError();
    }
  }
}
