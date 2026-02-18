import { Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { AnalysisItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/analysis-item.response.dto';

@Injectable()
export class ListCurrentYearAnalysesUseCase {
  protected readonly _type = ListCurrentYearAnalysesUseCase.name;

  public execute(
    pagination: ListDataInputModel,
  ): ListDataOutputModel<AnalysisItemResponseDto> {
    return new ListDataOutputModel({
      page: pagination.page,
      limit: pagination.limit,
      totalItems: 0,
      resource: [],
    });
  }
}
