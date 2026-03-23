import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { SystemLogListFiltersType } from '@module/admin/system-logs/domain/repository/system-logs/query/model/system-log-list.filters';
import type { GetSystemLogQueryResult } from '@module/admin/system-logs/domain/repository/system-logs/query/result/get-system-log.query.result';

export abstract class SystemLogsQueryRepositoryGateway {
  protected readonly _type = SystemLogsQueryRepositoryGateway.name;

  public abstract listByIsError(
    pagination: ListDataInputModel,
    isError: boolean,
    filters: SystemLogListFiltersType,
  ): Promise<ListDataOutputModel<GetSystemLogQueryResult>>;
}
