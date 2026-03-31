import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { StartSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/start-support-ticket.response.dto';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';
import { SupportTicketAlreadyAssignedError } from '@module/customer/service-desk/error/support-ticket-already-assigned.error';
import { SupportTicketInvalidSupportTypeError } from '@module/customer/service-desk/error/support-ticket-invalid-support-type.error';
import { SupportTicketNotFoundError } from '@module/customer/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class StartSupportTicketUseCase {
  protected readonly _type = StartSupportTicketUseCase.name;

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
  ): Promise<StartSupportTicketResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    const ticket = await this.fetchTicketOrThrow(supportTicketId);

    this.assertTicketHasNoAssignedAttendant(ticket);
    this.assertSupportTypeMatch(ticket, attendant.supportType);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.supportTicketCommandRepositoryGateway.updateSupportTicketStatusAndAssignedAttendant(
        ticket.id,
        SupportTicketStatusEnum.IN_PROGRESS,
        attendant.id,
      ),
    );

    await transaction.commit();

    return StartSupportTicketResponseDto.build({
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


  private assertTicketHasNoAssignedAttendant(
    ticket: GetSupportTicketDetailQueryResult,
  ): void {
    if (ticket.assignedAttendantId !== null) {
      throw new SupportTicketAlreadyAssignedError();
    }
  }

  private assertSupportTypeMatch(
    ticket: GetSupportTicketDetailQueryResult,
    attendantSupportType: SupportTypeEnum,
  ): void {
    if (ticket.supportType !== attendantSupportType) {
      throw new SupportTicketInvalidSupportTypeError();
    }
  }
}
