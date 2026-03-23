import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CreateCreditPackRequestDto } from '@module/admin/credit-pack/dto/request/create-credit-pack.request.dto';
import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import { CreditPackNotFoundError } from '@module/customer/credit-pack/error/credit-pack-not-found.error';

@Injectable()
export class CreateCreditPackUseCase {
  protected readonly _type = CreateCreditPackUseCase.name;

  public constructor(
    @Inject(CreditPackCommandRepositoryGateway)
    private readonly creditPackCommandRepository: CreditPackCommandRepositoryGateway,
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepository: CreditPackQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateCreditPackRequestDto,
  ): Promise<GetCreditPackResponseDto> {
    const creditPack = new CreditPackEntity({
      price: dto.price,
      creditAmount: dto.creditAmount,
      active: true,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.creditPackCommandRepository.createCreditPack(creditPack),
    ]);
    await transaction.commit();

    const created = await this.creditPackQueryRepository.findOneCreditPackById(
      creditPack.id,
    );

    if (!created) {
      throw new CreditPackNotFoundError();
    }

    return GetCreditPackResponseDto.build({
      creditPackId: created.id,
      price: created.price,
      creditAmount: created.creditAmount,
      active: created.active,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }
}
