import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { CreditPackNotFoundError } from '@module/customer/credit-pack/error/credit-pack-not-found.error';

@Injectable()
export class DeleteCreditPackUseCase {
  protected readonly _type = DeleteCreditPackUseCase.name;

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
  ): Promise<GetCreditPackResponseDto> {
    const existing =
      await this.creditPackQueryRepository.findOneCreditPackById(creditPackId);

    if (!existing) {
      throw new CreditPackNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.creditPackCommandRepository.deleteCreditPack(creditPackId),
    ]);
    await transaction.commit();

    return GetCreditPackResponseDto.build({
      creditPackId: existing.id,
      name: existing.name,
      description: existing.description,
      price: existing.price,
      creditAmount: existing.creditAmount,
      active: existing.active,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
    });
  }
}
