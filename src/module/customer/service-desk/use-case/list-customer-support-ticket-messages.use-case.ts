import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { ListCustomerSupportTicketMessagesRequestDto } from '@module/customer/service-desk/dto/request/list-customer-support-ticket-messages.request.dto';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketMessagesQueryParam } from '@module/support/service-desk/domain/repository/support-ticket-message/query/param/list-support-ticket-messages.query.param';
import { SupportTicketMessageQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/query/support-ticket-message.query.repository.gateway';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ListSupportTicketMessagesResponseDto } from '@module/support/service-desk/dto/response/list-support-ticket-messages.response.dto';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListCustomerSupportTicketMessagesUseCase {
  protected readonly _type = ListCustomerSupportTicketMessagesUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketMessageQueryRepositoryGateway)
    private readonly supportTicketMessageQueryRepositoryGateway: SupportTicketMessageQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    supportTicketId: SupportTicketId,
    dto: ListCustomerSupportTicketMessagesRequestDto,
  ): Promise<ListSupportTicketMessagesResponseDto> {
    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (member === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdAndOrganization(
        supportTicketId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    if (supportTicket === null) {
      throw new SupportTicketNotFoundError();
    }

    const listResult =
      await this.supportTicketMessageQueryRepositoryGateway.listPaginatedBySupportTicketId(
        new ListSupportTicketMessagesQueryParam({
          page: dto.page,
          limit: dto.limit,
          supportTicketId: supportTicket.id,
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
