import console from 'console';

import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CreateRetirementPlanningRgpsRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps.request.dto';
import { CreateRetirementPlanningRgpsResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRgpsUseCase {
  protected readonly _type = CreateRetirementPlanningRgpsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    // @Inject(BaseTransactionRepositoryGateway)
    // private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPlanningRgpsRequestDto,
  ): Promise<CreateRetirementPlanningRgpsResponseDto> {
    console.log('dto', dto);

    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    return new CreateRetirementPlanningRgpsResponseDto();
  }
}
