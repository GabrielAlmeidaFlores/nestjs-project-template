import { Inject, Injectable } from '@nestjs/common';

import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { CreditPackNotFoundError } from '@module/customer/credit-pack/error/credit-pack-not-found.error';

@Injectable()
export class GetCreditPackUseCase {
  protected readonly _type = GetCreditPackUseCase.name;

  public constructor(
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepository: CreditPackQueryRepositoryGateway,
  ) {}

  public async execute(
    creditPackId: CreditPackId,
  ): Promise<GetCreditPackResponseDto> {
    const creditPack =
      await this.creditPackQueryRepository.findOneCreditPackById(creditPackId);

    if (!creditPack) {
      throw new CreditPackNotFoundError();
    }

    return GetCreditPackResponseDto.build({
      creditPackId: creditPack.id,
      price: creditPack.price,
      creditAmount: creditPack.creditAmount,
      active: creditPack.active,
      createdAt: creditPack.createdAt,
      updatedAt: creditPack.updatedAt,
    });
  }
}
