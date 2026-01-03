import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ListRetirementPlanningRgpsPeriodQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/param/list-retirement-planning-rgps-period.query.param';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { ListRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/list-retirement-planning-rgps-period.request.dto';
import { GetRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-period.response.dto';
import { ListRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/list-retirement-planning-rgps-period.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListRetirementPlanningRgpsPeriodUseCase {
  protected readonly _type = ListRetirementPlanningRgpsPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodQueryRepositoryGateway: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<ListRetirementPlanningRgpsPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const listParam = new ListRetirementPlanningRgpsPeriodQueryParam({
      ...dto,
    });

    const listQueryResult =
      await this.retirementPlanningRgpsPeriodQueryRepositoryGateway.listByRetirementPlanningRgpsId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map((item) =>
      GetRetirementPlanningRgpsPeriodResponseDto.build({
        ...item,
      }),
    );

    return ListRetirementPlanningRgpsPeriodResponseDto.build({
      ...listQueryResult,
      resource,
    });
  }
}
