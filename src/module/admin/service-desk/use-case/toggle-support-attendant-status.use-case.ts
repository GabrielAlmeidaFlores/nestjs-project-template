import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ToggleSupportAttendantStatusResponseDto } from '@module/admin/service-desk/dto/response/toggle-support-attendant-status.response.dto';
import { SupportAttendantCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';

@Injectable()
export class ToggleSupportAttendantStatusUseCase {
  protected readonly _type = ToggleSupportAttendantStatusUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportAttendantCommandRepositoryGateway)
    private readonly supportAttendantCommandRepositoryGateway: SupportAttendantCommandRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
  ) {}

  public async execute(
    supportAttendantId: SupportAttendantId,
    isActive: boolean,
  ): Promise<ToggleSupportAttendantStatusResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantById(
        supportAttendantId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    const transactions = [
      this.supportAttendantCommandRepositoryGateway.updateSupportAttendantAndAuthIdentityIsActive(
        supportAttendantId,
        isActive,
      ),
    ];

    if (!isActive) {
      transactions.push(
        this.supportTicketCommandRepositoryGateway.unassignTicketsByAttendantId(
          supportAttendantId,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    if (!isActive) {
      await this.invalidateAttendantSession(supportAttendantId);
    }

    return ToggleSupportAttendantStatusResponseDto.build({
      supportAttendantId,
    });
  }

  private async invalidateAttendantSession(
    supportAttendantId: SupportAttendantId,
  ): Promise<void> {
    const authIdentityId =
      await this.supportAttendantQueryRepositoryGateway.findAuthIdentityIdBySupportAttendantId(
        supportAttendantId,
      );

    if (authIdentityId !== null) {
      await this.authIdentitySessionGateway.deleteSession(authIdentityId);
    }
  }
}
