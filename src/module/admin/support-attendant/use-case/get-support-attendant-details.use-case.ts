import { Inject, Injectable } from '@nestjs/common';

import { GetSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/get-support-attendant.response.dto';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportAttendantNotFoundError } from '@module/support/service-desk/error/support-attendant-not-found.error';

@Injectable()
export class GetSupportAttendantDetailsUseCase {
  protected readonly _type = GetSupportAttendantDetailsUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepository: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepository: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    supportAttendantId: SupportAttendantId,
  ): Promise<GetSupportAttendantResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepository.findOneSupportAttendantById(
        supportAttendantId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    const resolvedCountMap =
      await this.supportTicketQueryRepository.countResolvedTicketsByAttendantIds(
        [supportAttendantId],
      );

    return GetSupportAttendantResponseDto.build({
      supportAttendantId: attendant.id,
      name: attendant.name,
      email: attendant.email,
      supportType: attendant.supportType,
      isActive: attendant.isActive,
      resolvedTicketsCount: resolvedCountMap.get(supportAttendantId) ?? 0,
      createdAt: attendant.createdAt,
      updatedAt: attendant.updatedAt,
    });
  }
}
