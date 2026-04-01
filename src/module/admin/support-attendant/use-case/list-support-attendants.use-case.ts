import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/get-support-attendant.response.dto';
import { ListSupportAttendantsResponseDto } from '@module/admin/support-attendant/dto/response/list-support-attendants.response.dto';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';

@Injectable()
export class ListSupportAttendantsUseCase {
  protected readonly _type = ListSupportAttendantsUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepository: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepository: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListSupportAttendantsResponseDto> {
    const result =
      await this.supportAttendantQueryRepository.listSupportAttendants(
        pagination,
      );

    const resolvedCountMap =
      await this.supportTicketQueryRepository.countResolvedTicketsByAttendantIds(
        result.resource.map((attendant) => attendant.id),
      );

    const resource = result.resource.map((attendant) =>
      GetSupportAttendantResponseDto.build({
        supportAttendantId: attendant.id,
        name: attendant.name,
        email: attendant.email,
        supportType: attendant.supportType,
        isActive: attendant.isActive,
        resolvedTicketsCount: resolvedCountMap.get(attendant.id) ?? 0,
        createdAt: attendant.createdAt,
        updatedAt: attendant.updatedAt,
      }),
    );

    return ListSupportAttendantsResponseDto.build({
      ...result,
      resource,
    });
  }
}
