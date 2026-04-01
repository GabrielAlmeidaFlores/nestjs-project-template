import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketMessagesQueryParam } from '@module/support/service-desk/domain/repository/support-ticket-message/query/param/list-support-ticket-messages.query.param';
import { SupportTicketMessageQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/query/support-ticket-message.query.repository.gateway';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ListSupportTicketMessagesRequestDto } from '@module/support/service-desk/dto/request/list-support-ticket-messages.request.dto';
import { ListSupportTicketMessagesResponseDto } from '@module/support/service-desk/dto/response/list-support-ticket-messages.response.dto';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSupportTicketMessagesUseCase {
  protected readonly _type = ListSupportTicketMessagesUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketMessageQueryRepositoryGateway)
    private readonly supportTicketMessageQueryRepositoryGateway: SupportTicketMessageQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    supportTicketId: SupportTicketId,
    dto: ListSupportTicketMessagesRequestDto,
  ): Promise<ListSupportTicketMessagesResponseDto> {
    const supportAttendant =
      await this.supportAttendantQueryRepositoryGateway.findOneByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!supportAttendant) {
      throw new SupportAccountNotFoundError();
    }

    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdAndSupportType(
        supportTicketId,
        supportAttendant.supportType,
      );

    if (!supportTicket) {
      throw new SupportTicketNotFoundError();
    }

    const listResult =
      await this.supportTicketMessageQueryRepositoryGateway.listPaginatedBySupportTicketId(
        new ListSupportTicketMessagesQueryParam({
          page: dto.page,
          limit: dto.limit,
          supportTicketId,
        }),
      );

    const resource = listResult.resource.map((message) =>
      SupportTicketMessageItemResponseDto.build({
        senderAuthIdentityId: message.senderAuthIdentityId.toString(),
        senderName: message.senderName,
        messageText: message.content,
        messageDateTime: message.createdAt,
      }),
    );

    return ListSupportTicketMessagesResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource,
    });
  }
}
