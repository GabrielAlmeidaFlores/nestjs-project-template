import { Inject, Injectable } from '@nestjs/common';

import { ListSystemActivitiesCollaboratorsAdminRequestDto } from '@module/admin/system-activities/dto/request/list-system-activities-collaborators-admin.request.dto';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ListOrganizationCollaboratorsWithStatsResponseDto } from '@module/customer/system-activities/dto/response/list-organization-collaborators-with-stats.response.dto';
import { OrganizationCollaboratorWithStatsItemResponseDto } from '@module/customer/system-activities/dto/response/organization-collaborator-with-stats-item.response.dto';

@Injectable()
export class ListSystemActivitiesCollaboratorsAdminUseCase {
  protected readonly _type = ListSystemActivitiesCollaboratorsAdminUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListSystemActivitiesCollaboratorsAdminRequestDto,
  ): Promise<ListOrganizationCollaboratorsWithStatsResponseDto> {
    const listResult =
      await this.organizationMemberQueryRepositoryGateway.listCollaboratorsWithStats(
        {
          page: dto.page,
          limit: dto.limit,
          organizationId: dto.organizationId ?? null,
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
