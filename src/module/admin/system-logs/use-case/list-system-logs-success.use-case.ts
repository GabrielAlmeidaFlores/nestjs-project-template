import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetSystemLogQueryResult } from '@module/admin/system-logs/domain/repository/system-logs/query/result/get-system-log.query.result';
import { SystemLogsQueryRepositoryGateway } from '@module/admin/system-logs/domain/repository/system-logs/query/system-logs.query.repository.gateway';
import { ListSystemLogsRequestDto } from '@module/admin/system-logs/dto/request/list-system-logs.request.dto';
import { ListSystemLogsResponseDto } from '@module/admin/system-logs/dto/response/list-system-logs.response.dto';
import { SystemLogItemResponseDto } from '@module/admin/system-logs/dto/response/system-log-item.response.dto';

import type { SystemLogListFiltersType } from '@module/admin/system-logs/domain/repository/system-logs/query/type/system-log-list.filters';

@Injectable()
export class ListSystemLogsSuccessUseCase {
  protected readonly _type = ListSystemLogsSuccessUseCase.name;

  public constructor(
    @Inject(SystemLogsQueryRepositoryGateway)
    private readonly systemLogsQueryRepositoryGateway: SystemLogsQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListSystemLogsRequestDto,
  ): Promise<ListSystemLogsResponseDto> {
    const pagination = new ListDataInputModel(dto);
    const filters: SystemLogListFiltersType = {
      startDate: dto.startDate ?? undefined,
      endDate: dto.endDate ?? undefined,
    };

    const result = await this.systemLogsQueryRepositoryGateway.listByIsError(
      pagination,
      false,
      filters,
    );

    const resource = result.resource.map((item) => this.buildItem(item));

    return ListSystemLogsResponseDto.build({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      amountItemsCurrentPage: result.amountItemsCurrentPage,
      resource,
    });
  }

  private buildItem(item: GetSystemLogQueryResult): SystemLogItemResponseDto {
    return SystemLogItemResponseDto.build({
      code: item.code,
      endpoint: item.endpoint,
      createdAt: item.createdAt,
      isError: item.isError,
      stackTrace: item.stackTrace ?? null,
      requestBody: item.requestBody ?? null,
      responseBody: item.responseBody ?? null,
    });
  }
}
