import { Injectable, Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/module/cid-ten/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import {
  ListCidTenResponseDto,
  CidTenItemResponseDto,
} from '@module/customer/analysis-tool/module/cid-ten/dto/response/list-cid-ten.response.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListCidTenUseCase {
  protected readonly _type = ListCidTenUseCase.name;

  public constructor(
    @Inject(CidTenQueryRepositoryGateway)
    private readonly cidTenQueryRepositoryGateway: CidTenQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListDataRequestDto,
  ): Promise<ListCidTenResponseDto> {
    const result = await this.cidTenQueryRepositoryGateway.findAllPaginated(
      new ListDataInputModel(dto),
    );

    const resource = result.resource.map((cidTen) =>
      CidTenItemResponseDto.build({
        id: cidTen.id,
        code: cidTen.code,
        description: cidTen.description,
      }),
    );

    return ListCidTenResponseDto.build({
      ...result,
      resource,
    });
  }
}
