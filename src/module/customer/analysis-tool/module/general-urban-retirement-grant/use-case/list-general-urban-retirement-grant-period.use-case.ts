import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { ListGeneralUrbanRetirementGrantPeriodQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/param/list-general-urban-retirement-grant-period.query.param';
import { ListGeneralUrbanRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/list-general-urban-retirement-grant-period.request.dto';
import { GetGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-period.response.dto';
import { ListGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/list-general-urban-retirement-grant-period.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListGeneralUrbanRetirementGrantPeriodUseCase {
  protected readonly _type = ListGeneralUrbanRetirementGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodQueryRepositoryGateway: GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListGeneralUrbanRetirementGrantPeriodRequestDto,
  ): Promise<ListGeneralUrbanRetirementGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const listParam = new ListGeneralUrbanRetirementGrantPeriodQueryParam({
      ...dto,
      generalUrbanRetirementGrant: dto.generalUrbanRetirementGrantId,
    });

    const listQueryResult =
      await this.generalUrbanRetirementGrantPeriodQueryRepositoryGateway.listByGeneralUrbanRetirementGrantId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map((item) =>
      GetGeneralUrbanRetirementGrantPeriodResponseDto.build({
        ...item,
      }),
    );

    return ListGeneralUrbanRetirementGrantPeriodResponseDto.build({
      ...listQueryResult,
      resource,
    });
  }
}
