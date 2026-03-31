import { Inject, Injectable } from '@nestjs/common';

import { ListSupportAttendantsResponseDto } from '@module/admin/service-desk/dto/response/list-support-attendants.response.dto';
import { SupportAttendantListItemResponseDto } from '@module/admin/service-desk/dto/response/support-attendant-list-item.response.dto';
import { ListSupportAttendantsQueryParam } from '@module/customer/service-desk/domain/repository/support-attendant/query/param/list-support-attendants.query.param';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';

@Injectable()
export class ListSupportAttendantsUseCase {
  protected readonly _type = ListSupportAttendantsUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
  ) {}

  public async execute(
    param: ListSupportAttendantsQueryParam,
  ): Promise<ListSupportAttendantsResponseDto> {
    const result =
      await this.supportAttendantQueryRepositoryGateway.listAllSupportAttendants(
        param,
      );

    const resource = result.resource.map((item) =>
      SupportAttendantListItemResponseDto.build({
        supportAttendantId: item.id,
        name: item.name,
        email: item.email,
        supportType: item.supportType,
        isActive: item.isActive,
        totalAttendances: item.totalAttendances,
        createdAt: item.createdAt,
      }),
    );

    return ListSupportAttendantsResponseDto.build({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      amountItemsCurrentPage: result.amountItemsCurrentPage,
      resource,
    });
  }
}
