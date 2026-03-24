import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { OrganizationNotAvailableForCustomerError } from '@module/customer/account/error/organization-not-available-for-customer.error';
import { SystemActivitiesQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/query/system-activities.query.repository.gateway';
import { ListSystemActivitiesRequestDto } from '@module/customer/system-activities/dto/request/list-system-activities.request.dto';
import { ListSystemActivitiesResponseDto } from '@module/customer/system-activities/dto/response/list-system-activities.response.dto';
import { SystemActivityItemResponseDto } from '@module/customer/system-activities/dto/response/system-activity-item.response.dto';
import { OrganizationMemberFilterRequiresOwnerError } from '@module/customer/system-activities/error/organization-member-filter-requires-owner.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListSystemActivitiesUseCase {
  protected readonly _type = ListSystemActivitiesUseCase.name;

  public constructor(
    @Inject(SystemActivitiesQueryRepositoryGateway)
    private readonly systemActivitiesQueryRepositoryGateway: SystemActivitiesQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListSystemActivitiesRequestDto,
  ): Promise<ListSystemActivitiesResponseDto> {
    const organizationMemberIdFilter = dto.organizationMemberId ?? null;

    if (organizationMemberIdFilter !== null) {
      if (organizationSessionData.owner === false) {
        throw new OrganizationMemberFilterRequiresOwnerError();
      }

      const memberOrganizationId =
        await this.organizationMemberQueryRepositoryGateway.findOrganizationIdByOrganizationMemberId(
          organizationMemberIdFilter,
        );

      if (memberOrganizationId === null) {
        throw new OrganizationMemberNotFoundError();
      }

      if (
        memberOrganizationId.toString() !==
        organizationSessionData.organizationId.toString()
      ) {
        throw new OrganizationNotAvailableForCustomerError();
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
        organizationId: organizationSessionData.organizationId,
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
    const HOURS_IN_DAY = 23;
    const MINUTES_IN_HOUR = 59;
    const SECONDS_IN_MINUTE = 59;
    const MILLISECONDS_IN_SECOND = 999;

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (start instanceof Date && !Number.isNaN(start.getTime())) {
      startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
    }

    if (end instanceof Date && !Number.isNaN(end.getTime())) {
      endDate = new Date(end);
      endDate.setHours(
        HOURS_IN_DAY,
        MINUTES_IN_HOUR,
        SECONDS_IN_MINUTE,
        MILLISECONDS_IN_SECOND,
      );
    }

    return { startDate, endDate };
  }
}
