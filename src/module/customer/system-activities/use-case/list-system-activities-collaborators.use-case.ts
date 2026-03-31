import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ListSystemActivitiesCollaboratorsRequestDto } from '@module/customer/system-activities/dto/request/list-system-activities-collaborators.request.dto';
import { ListOrganizationCollaboratorsWithStatsResponseDto } from '@module/customer/system-activities/dto/response/list-organization-collaborators-with-stats.response.dto';
import { OrganizationCollaboratorWithStatsItemResponseDto } from '@module/customer/system-activities/dto/response/organization-collaborator-with-stats-item.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListSystemActivitiesCollaboratorsUseCase {
  protected readonly _type = ListSystemActivitiesCollaboratorsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListSystemActivitiesCollaboratorsRequestDto,
  ): Promise<ListOrganizationCollaboratorsWithStatsResponseDto> {
    const listResult =
      await this.organizationMemberQueryRepositoryGateway.listCollaboratorsWithStats(
        {
          page: dto.page,
          limit: dto.limit,
          organizationId: organizationSessionData.organizationId,
          search: dto.search?.trim() ?? null,
        },
      );

    const resource = listResult.resource.map((item) =>
      OrganizationCollaboratorWithStatsItemResponseDto.build({
        organizationMemberId: item.organizationMemberId,
        name: item.name,
        email: item.email,
        federalDocument: item.federalDocument,
        registrationDate: item.registrationDate,
        legalPleadingCount: item.legalPleadingCount,
        analysisToolRecordCount: item.analysisToolRecordCount,
      }),
    );

    return ListOrganizationCollaboratorsWithStatsResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource,
    });
  }
}
