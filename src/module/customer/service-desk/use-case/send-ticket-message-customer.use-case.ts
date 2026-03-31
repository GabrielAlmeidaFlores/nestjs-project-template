import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { TicketMessageSenderTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/enum/ticket-message-sender-type.enum';
import { SupportTicketMessageEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';
import { SendTicketMessageRequestDto } from '@module/customer/service-desk/dto/request/send-ticket-message.request.dto';
import { SendSupportTicketMessageResponseDto } from '@module/customer/service-desk/dto/response/send-support-ticket-message.response.dto';
import { SupportTicketAccessDeniedError } from '@module/customer/service-desk/error/support-ticket-access-denied.error';
import { SupportTicketInvalidStatusError } from '@module/customer/service-desk/error/support-ticket-invalid-status.error';
import { SupportTicketNotFoundError } from '@module/customer/service-desk/error/support-ticket-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SendTicketMessageCustomerUseCase {
  protected readonly _type = SendTicketMessageCustomerUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
    @Inject(SupportTicketMessageCommandRepositoryGateway)
    private readonly supportTicketMessageCommandRepositoryGateway: SupportTicketMessageCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    orgSession: OrganizationSessionDataModel,
    supportTicketId: SupportTicketId,
    dto: SendTicketMessageRequestDto,
  ): Promise<SendSupportTicketMessageResponseDto> {
    const ticket = await this.fetchTicketOrThrow(supportTicketId);

    this.assertAccess(ticket, sessionData, orgSession);
    this.assertTicketNotResolved(ticket);

    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const message = new SupportTicketMessageEntity({
      supportTicketId: ticket.id,
      senderAuthIdentityId: sessionData.authIdentityId,
      senderName: customer.name,
      senderType: TicketMessageSenderTypeEnum.REQUESTER,
      content: dto.content,
    });

    const transactions = [
      this.supportTicketMessageCommandRepositoryGateway.createSupportTicketMessage(
        message,
      ),
    ];

    if (ticket.status === SupportTicketStatusEnum.AWAITING_RESPONSE) {
      transactions.push(
        this.supportTicketCommandRepositoryGateway.updateSupportTicketStatus(
          ticket.id,
          SupportTicketStatusEnum.IN_PROGRESS,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SendSupportTicketMessageResponseDto.build({
      supportTicketId: ticket.id,
    });
  }

  private async fetchTicketOrThrow(
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailQueryResult> {
    const ticket =
      await this.supportTicketQueryRepositoryGateway.findOneSupportTicketById(
        supportTicketId,
      );

    if (!ticket) {
      throw new SupportTicketNotFoundError();
    }

    return ticket;
  }

  private assertAccess(
    ticket: GetSupportTicketDetailQueryResult,
    sessionData: SessionDataModel,
    orgSession: OrganizationSessionDataModel,
  ): void {
    const sameOrg =
      ticket.organizationId.toString() === orgSession.organizationId.toString();

    if (!sameOrg) {
      throw new SupportTicketAccessDeniedError();
    }

    if (
      !orgSession.owner &&
      ticket.requesterAuthIdentityId.toString() !==
        sessionData.authIdentityId.toString()
    ) {
      throw new SupportTicketAccessDeniedError();
    }
  }

  private assertTicketNotResolved(
    ticket: GetSupportTicketDetailQueryResult,
  ): void {
    if (ticket.status === SupportTicketStatusEnum.RESOLVED) {
      throw new SupportTicketInvalidStatusError();
    }
  }
}
