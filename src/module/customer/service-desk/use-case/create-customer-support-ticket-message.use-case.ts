import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { CreateCustomerSupportTicketMessageRequestDto } from '@module/customer/service-desk/dto/request/create-customer-support-ticket-message.request.dto';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketMessageEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { SupportTicketAlreadyResolvedError } from '@module/support/service-desk/error/support-ticket-already-resolved.error';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCustomerSupportTicketMessageUseCase {
  protected readonly _type = CreateCustomerSupportTicketMessageUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketMessageCommandRepositoryGateway)
    private readonly supportTicketMessageCommandRepositoryGateway: SupportTicketMessageCommandRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    supportTicketId: SupportTicketId,
    dto: CreateCustomerSupportTicketMessageRequestDto,
  ): Promise<SupportTicketMessageItemResponseDto> {
    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (member === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdAndOrganization(
        supportTicketId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    if (supportTicket === null) {
      throw new SupportTicketNotFoundError();
    }

    if (supportTicket.status === SupportTicketStatusEnum.RESOLVED) {
      throw new SupportTicketAlreadyResolvedError();
    }

    const supportTicketMessage = new SupportTicketMessageEntity({
      supportTicketId: supportTicket.id,
      senderAuthIdentityId: sessionData.authIdentityId,
      senderName: customer.name,
      content: dto.messageText,
    });

    const transactionEvents = [
      this.supportTicketMessageCommandRepositoryGateway.createTransaction({
        supportTicketId: supportTicketMessage.supportTicketId,
        senderAuthIdentityId: supportTicketMessage.senderAuthIdentityId,
        senderName: supportTicketMessage.senderName,
        content: supportTicketMessage.content,
      }),
    ];

    if (supportTicket.status === SupportTicketStatusEnum.IN_PROGRESS) {
      transactionEvents.push(
        this.supportTicketCommandRepositoryGateway.updateStatusByIdTransaction(
          supportTicket.id,
          SupportTicketStatusEnum.WAITING_RESPONSE,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactionEvents);
    await transaction.commit();

    return SupportTicketMessageItemResponseDto.build({
      senderAuthIdentityId:
        supportTicketMessage.senderAuthIdentityId.toString(),
      senderName: supportTicketMessage.senderName,
      messageText: supportTicketMessage.content,
      messageDateTime: supportTicketMessage.createdAt,
    });
  }
}
