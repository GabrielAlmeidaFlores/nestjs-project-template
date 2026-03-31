import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ResolveSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/resolve-support-ticket.response.dto';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';
import { SupportTicketAccessDeniedError } from '@module/customer/service-desk/error/support-ticket-access-denied.error';
import { SupportTicketInvalidStatusError } from '@module/customer/service-desk/error/support-ticket-invalid-status.error';
import { SupportTicketNotFoundError } from '@module/customer/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ResolveSupportTicketUseCase {
  protected readonly _type = ResolveSupportTicketUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    supportTicketId: SupportTicketId,
  ): Promise<ResolveSupportTicketResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    const ticket = await this.fetchTicketOrThrow(supportTicketId);

    this.assertTicketNotAlreadyResolved(ticket);
    this.assertAttendantOwnsTicket(ticket, attendant.id);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.supportTicketCommandRepositoryGateway.resolveSupportTicket(
        ticket.id,
        attendant.id,
      ),
    );

    await transaction.commit();

    return ResolveSupportTicketResponseDto.build({
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

  private assertTicketNotAlreadyResolved(
    ticket: GetSupportTicketDetailQueryResult,
  ): void {
    if (ticket.status === SupportTicketStatusEnum.RESOLVED) {
      throw new SupportTicketInvalidStatusError();
    }
  }

  private assertAttendantOwnsTicket(
    ticket: GetSupportTicketDetailQueryResult,
    attendantId: SupportAttendantId,
  ): void {
    if (
      ticket.assignedAttendantId === null ||
      ticket.assignedAttendantId.toString() !== attendantId.toString()
    ) {
      throw new SupportTicketAccessDeniedError();
    }
  }
}
