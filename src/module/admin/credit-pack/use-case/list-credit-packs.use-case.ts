import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { ListCreditPacksResponseDto } from '@module/admin/credit-pack/dto/response/list-credit-packs.response.dto';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';

@Injectable()
export class ListCreditPacksUseCase {
  protected readonly _type = ListCreditPacksUseCase.name;

  public constructor(
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepository: CreditPackQueryRepositoryGateway,
  ) {}

  public async execute(
    listData: ListDataInputModel,
  ): Promise<ListCreditPacksResponseDto> {
    const result =
      await this.creditPackQueryRepository.listCreditPacks(listData);

    const resources = result.resource.map((creditPack) =>
      GetCreditPackResponseDto.build({
        creditPackId: creditPack.id,
        price: creditPack.price,
        creditAmount: creditPack.creditAmount,
        active: creditPack.active,
        createdAt: creditPack.createdAt,
        updatedAt: creditPack.updatedAt,
      }),
    );

    return ListCreditPacksResponseDto.build({
      ...result,
      resource: resources,
    });
  }
}
