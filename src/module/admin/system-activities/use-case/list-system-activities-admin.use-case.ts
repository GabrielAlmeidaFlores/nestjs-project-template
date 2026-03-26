import { Inject, Injectable } from '@nestjs/common';

import { ListSystemActivitiesAdminRequestDto } from '@module/admin/system-activities/dto/request/list-system-activities-admin.request.dto';
import { OrganizationMemberNotInOrganizationError } from '@module/admin/system-activities/error/organization-member-not-in-organization.error';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { SystemActivitiesQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/query/system-activities.query.repository.gateway';
import { ListSystemActivitiesResponseDto } from '@module/customer/system-activities/dto/response/list-system-activities.response.dto';
import { SystemActivityItemResponseDto } from '@module/customer/system-activities/dto/response/system-activity-item.response.dto';

@Injectable()
export class ListSystemActivitiesAdminUseCase {
  protected readonly _type = ListSystemActivitiesAdminUseCase.name;

  public constructor(
    @Inject(SystemActivitiesQueryRepositoryGateway)
    private readonly systemActivitiesQueryRepositoryGateway: SystemActivitiesQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListSystemActivitiesAdminRequestDto,
  ): Promise<ListSystemActivitiesResponseDto> {
    const organizationMemberIdFilter = dto.organizationMemberId ?? null;
    const organizationId = dto.organizationId ?? null;

    if (organizationId !== null && organizationMemberIdFilter !== null) {
      const memberOrganizationId =
        await this.organizationMemberQueryRepositoryGateway.findOrganizationIdByOrganizationMemberId(
          organizationMemberIdFilter,
        );

      if (memberOrganizationId === null) {
        throw new OrganizationMemberNotFoundError();
      }

      if (memberOrganizationId.toString() !== organizationId.toString()) {
        throw new OrganizationMemberNotInOrganizationError();
      }
    }

    const { startDate, endDate } = this.normalizeDateRange(
      dto.startDate,
      dto.endDate,
    );

    const listResult =
      await this.systemActivitiesQueryRepositoryGateway.listPaginated({
        page: dto.page,
        limit: dto.limit,
        organizationId,
        organizationMemberIdFilter,
        search: dto.search?.trim() ?? null,
        startDate,
        endDate,
      });

    const resource = listResult.resource.map((item) =>
      SystemActivityItemResponseDto.build({
        id: item.id,
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
        organizationMemberId: item.organizationMemberId,
        collaboratorName: item.collaboratorName,
        collaboratorEmail: item.collaboratorEmail,
        analysisToolRecordId: item.analysisToolRecordId,
        analysisCode: item.analysisCode,
        analysisToolClientId: item.analysisToolClientId,
        clientName: item.clientName,
      }),
    );

    return ListSystemActivitiesResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource,
    });
  }

  private normalizeDateRange(
    start?: Date,
    end?: Date,
  ): { startDate: Date | null; endDate: Date | null } {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (start instanceof Date && !Number.isNaN(start.getTime())) {
      startDate = new Date(
        start.toISOString().split('T')[0] + 'T00:00:00.000Z',
      );
    }

    if (end instanceof Date && !Number.isNaN(end.getTime())) {
      endDate = new Date(end.toISOString().split('T')[0] + 'T23:59:59.999Z');
    }

    return { startDate, endDate };
  }
}
