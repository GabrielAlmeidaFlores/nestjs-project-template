import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ListRetirementPlanningRgpsTimeAcceleratorQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/param/list-retirement-planning-rgps-time-accelerator.query.param';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { ListRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/dto/request/list-retirement-planning-rgps-time-accelerator.request.dto';
import { GetRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-time-accelerator.response.dto';
import { ListRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/dto/response/list-retirement-planning-rgps-time-accelerator.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListRetirementPlanningRgpsTimeAcceleratorUseCase {
  protected readonly _type =
    ListRetirementPlanningRgpsTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway)
    private readonly retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway: RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListRetirementPlanningRgpsTimeAcceleratorRequestDto,
  ): Promise<ListRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }
    const listParam = new ListRetirementPlanningRgpsTimeAcceleratorQueryParam({
      ...dto,
    });

    const listQueryResult =
      await this.retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway.listByRetirementPlanningRgpsId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map((item) =>
      GetRetirementPlanningRgpsTimeAcceleratorResponseDto.build({
        ...item,
      }),
    );

    return ListRetirementPlanningRgpsTimeAcceleratorResponseDto.build({
      ...listQueryResult,
      resource,
    });
  }
}
