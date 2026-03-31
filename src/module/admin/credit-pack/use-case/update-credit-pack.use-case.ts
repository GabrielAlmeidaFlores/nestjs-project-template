import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { UpdateCreditPackRequestDto } from '@module/admin/credit-pack/dto/request/update-credit-pack.request.dto';
import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { CreditPackNotFoundError } from '@module/customer/credit-pack/error/credit-pack-not-found.error';

@Injectable()
export class UpdateCreditPackUseCase {
  protected readonly _type = UpdateCreditPackUseCase.name;

  public constructor(
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepository: CreditPackQueryRepositoryGateway,
    @Inject(CreditPackCommandRepositoryGateway)
    private readonly creditPackCommandRepository: CreditPackCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    creditPackId: CreditPackId,
    dto: UpdateCreditPackRequestDto,
  ): Promise<GetCreditPackResponseDto> {
    const existing =
      await this.creditPackQueryRepository.findOneCreditPackById(creditPackId);

    if (!existing) {
      throw new CreditPackNotFoundError();
    }

    const updated = new CreditPackEntity({
      id: existing.id,
      price: dto.price ?? existing.price,
      creditAmount: dto.creditAmount ?? existing.creditAmount,
      active: dto.active ?? existing.active,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
      deletedAt: existing.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.creditPackCommandRepository.updateCreditPack(creditPackId, updated),
    ]);
    await transaction.commit();

    return GetCreditPackResponseDto.build({
      creditPackId: updated.id,
      price: updated.price,
      creditAmount: updated.creditAmount,
      active: updated.active,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }
}
