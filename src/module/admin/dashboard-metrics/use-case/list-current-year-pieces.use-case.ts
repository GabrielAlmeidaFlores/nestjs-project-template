import { Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { PieceItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/piece-item.response.dto';

@Injectable()
export class ListCurrentYearPiecesUseCase {
  protected readonly _type = ListCurrentYearPiecesUseCase.name;

  public execute(
    pagination: ListDataInputModel,
  ): ListDataOutputModel<PieceItemResponseDto> {
    return new ListDataOutputModel({
      page: pagination.page,
      limit: pagination.limit,
      totalItems: 0,
      resource: [],
    });
  }
}
