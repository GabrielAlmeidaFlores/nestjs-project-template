import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { GetCreditPackResponseDto } from '@module/customer/credit-pack/dto/response/get-credit-pack.response.dto';
import { ListCreditPacksResponseDto } from '@module/customer/credit-pack/dto/response/list-credit-packs.response.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListCreditPacksUseCase {
  protected readonly _type = ListCreditPacksUseCase.name;

  public constructor(
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepository: CreditPackQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListDataRequestDto,
  ): Promise<ListCreditPacksResponseDto> {
    const result = await this.creditPackQueryRepository.listActiveCreditPacks(
      new ListDataInputModel({ ...dto }),
    );

    const resources = result.resource.map((creditPack) =>
      GetCreditPackResponseDto.build({
        creditPackId: creditPack.id,
        name: creditPack.name,
        description: creditPack.description,
        price: creditPack.price,
        creditAmount: creditPack.creditAmount,
        createdAt: creditPack.createdAt,
        updatedAt: creditPack.updatedAt,
      }),
    );

    return ListCreditPacksResponseDto.build({ ...result, resource: resources });
  }
}
