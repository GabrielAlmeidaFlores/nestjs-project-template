import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { UpdateSupportAttendantRequestDto } from '@module/admin/support-attendant/dto/request/update-support-attendant.request.dto';
import { UpdateSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/update-support-attendant.response.dto';
import { SupportAttendantCommandRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAttendantEntity } from '@module/support/account/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportAttendantNotFoundError } from '@module/support/service-desk/error/support-attendant-not-found.error';

@Injectable()
export class UpdateSupportAttendantUseCase {
  protected readonly _type = UpdateSupportAttendantUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepository: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportAttendantCommandRepositoryGateway)
    private readonly supportAttendantCommandRepository: SupportAttendantCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepository: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    supportAttendantId: SupportAttendantId,
    dto: UpdateSupportAttendantRequestDto,
  ): Promise<UpdateSupportAttendantResponseDto> {
    const existing =
      await this.supportAttendantQueryRepository.findOneSupportAttendantById(
        supportAttendantId,
      );

    if (!existing) {
      throw new SupportAttendantNotFoundError();
    }

    const updated = new SupportAttendantEntity({
      id: existing.id,
      name: dto.name ?? existing.name,
      email: existing.email.toString(),
      supportType: dto.supportType ?? existing.supportType,
      isActive: dto.isActive ?? existing.isActive,
    });

    const transaction = await this.baseTransactionRepository.execute(
      this.supportAttendantCommandRepository.updateSupportAttendant(
        supportAttendantId,
        updated,
      ),
    );
    await transaction.commit();

    return UpdateSupportAttendantResponseDto.build({
      supportAttendantId,
    });
  }
}
