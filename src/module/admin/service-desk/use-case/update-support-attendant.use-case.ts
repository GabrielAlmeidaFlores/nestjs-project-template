import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { UpdateSupportAttendantRequestDto } from '@module/admin/service-desk/dto/request/update-support-attendant.request.dto';
import { UpdateSupportAttendantResponseDto } from '@module/admin/service-desk/dto/response/update-support-attendant.response.dto';
import { SupportAttendantCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportAttendantAlreadyExistsError } from '@module/customer/service-desk/error/support-attendant-already-exists.error';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';

@Injectable()
export class UpdateSupportAttendantUseCase {
  protected readonly _type = UpdateSupportAttendantUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportAttendantCommandRepositoryGateway)
    private readonly supportAttendantCommandRepositoryGateway: SupportAttendantCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    supportAttendantId: SupportAttendantId,
    dto: UpdateSupportAttendantRequestDto,
  ): Promise<UpdateSupportAttendantResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantById(
        supportAttendantId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    await this.validateEmailUniqueness(
      supportAttendantId,
      dto.email,
      attendant.email,
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.supportAttendantCommandRepositoryGateway.updateSupportAttendant(
        supportAttendantId,
        dto.name,
        dto.email,
        dto.supportType,
      ),
    );

    await transaction.commit();

    return UpdateSupportAttendantResponseDto.build({
      supportAttendantId,
    });
  }

  private async validateEmailUniqueness(
    currentAttendantId: SupportAttendantId,
    newEmail: string,
    currentEmail: string,
  ): Promise<void> {
    if (newEmail === currentEmail) {
      return;
    }

    const existing =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByEmail(
        newEmail,
      );

    if (existing && existing.id.toString() !== currentAttendantId.toString()) {
      throw new SupportAttendantAlreadyExistsError();
    }
  }
}
