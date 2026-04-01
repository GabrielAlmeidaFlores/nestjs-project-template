import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { MiniAdvisorCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/command/mini-advisor.command.repository.gateway';
import { MiniAdvisorEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import { CreateMiniAdvisorRequestDto } from '@module/customer/mini-advisor/dto/request/create-mini-advisor.request.dto';
import { CreateMiniAdvisorResponseDto } from '@module/customer/mini-advisor/dto/response/create-mini-advisor.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateMiniAdvisorUseCase {
  protected readonly _type = CreateMiniAdvisorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MiniAdvisorCommandRepositoryGateway)
    private readonly miniAdvisorCommandRepositoryGateway: MiniAdvisorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateMiniAdvisorRequestDto,
  ): Promise<CreateMiniAdvisorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const miniAdvisor = new MiniAdvisorEntity({
      clientSituation: dto.clientSituation,
      clientAge: dto.clientAge,
      clientGender: dto.clientGender,
      clientWorkHistory: dto.clientWorkHistory,
      hasContributedWithInss: dto.hasContributedWithInss,
      clientHasDisabilityOrLimitations: dto.clientHasDisabilityOrLimitations,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.miniAdvisorCommandRepositoryGateway.createMiniAdvisor(miniAdvisor),
    );

    await transaction.commit();

    return CreateMiniAdvisorResponseDto.build({
      miniAdvisorId: miniAdvisor.id,
    });
  }
}
